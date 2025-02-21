<?php

namespace App\Services;

use App\Repositories\Interfaces\OrderRepositoryInterface;
use App\Repositories\Interfaces\PaymentRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\DB;

class CheckoutService
{
    protected $orderRepository;
    protected $paymentRepository;
    protected $userRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        PaymentRepositoryInterface $paymentRepository,
        UserRepositoryInterface $userRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->paymentRepository = $paymentRepository;
        $this->userRepository = $userRepository;
    }

    public function processCheckout(array $data, $userId = null, $guestId = null)
    {
        // Validate input data (you can use Laravel's Validator here)
        $this->validateCheckoutData($data);

        // Start transaction
        return DB::transaction(function () use ($data, $userId, $guestId) {
            // Create order
            $orderData = [
                'user_id' => $userId,
                'guest_id' => $guestId,
                'customer_name' => $data['customer_name'],
                'customer_email' => $data['customer_email'],
                'customer_phone' => $data['customer_phone'],
                'total_price' => $data['total_price'],
                'shipping_fee' => $data['shipping_fee'],
                'address_id' => $data['address_id'],
                'note' => $data['note'] ?? null,
                'status' => 'processing',
                'shipping_status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => $data['payment_method'],
            ];

            $order = $this->orderRepository->createOrder($orderData);

            // Create payment
            $paymentData = [
                'order_id' => $order->id,
                'amount' => $data['total_price'],
                'payment_method' => $data['payment_method'],
                'payment_status' => 'pending',
            ];

            $this->paymentRepository->createPayment($paymentData);

            return $order;
        });
    }

    protected function validateCheckoutData(array $data)
    {
        // Add validation logic here
        if (empty($data['customer_name']) || empty($data['customer_phone'])) {
            throw new \Exception("Customer name and phone are required.");
        }
    }
}
