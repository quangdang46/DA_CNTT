<?php

namespace App\Services;

use App\Repositories\Interfaces\PaymentRepositoryInterface;

class PaymentService
{
    protected $paymentRepository;

    public function __construct(PaymentRepositoryInterface $paymentRepository)
    {
        $this->paymentRepository = $paymentRepository;
    }

    /**
     * Cập nhật trạng thái thanh toán của đơn hàng.
     */
    public function updatePaymentStatus($orderId, array $data)
    {
        $payment = $this->paymentRepository->findPaymentByOrderId($orderId);

        if (!$payment) {
            throw new \Exception("Payment not found for this order.");
        }

        // Validate payment status transition
        if ($payment->payment_status === 'success' && $data['payment_status'] !== 'refunded') {
            throw new \Exception("Cannot modify a successful payment.");
        }

        // Update payment status
        $this->paymentRepository->updatePayment($payment, [
            'payment_status' => $data['payment_status'],
            'transaction_id' => $data['transaction_id'] ?? null,
            'paid_at' => $data['payment_status'] === 'success' ? now() : null,
        ]);

        // If refunded, update refund status
        if ($data['payment_status'] === 'refunded') {
            $this->paymentRepository->updatePayment($payment, [
                'refund_status' => 'refunded',
                'refund_at' => now(),
            ]);
        }
    }
}
