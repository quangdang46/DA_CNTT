<?php

namespace App\Repositories;

use App\Models\Payment;
use App\Repositories\Interfaces\PaymentRepositoryInterface;

class PaymentRepository implements PaymentRepositoryInterface
{
    protected $payment;

    public function __construct(Payment $payment)
    {
        $this->payment = $payment;
    }
    public function createPayment(array $data)
    {
        return $this->payment->create($data);
    }

    public function updatePayment(array $data)
    {
        return $this->payment->update($data);
    }
    public function findPaymentByOrderId($orderId)
    {
        return $this->payment->where('order_id', $orderId)->first();
    }
}
