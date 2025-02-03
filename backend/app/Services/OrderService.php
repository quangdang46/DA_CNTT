<?php

namespace App\Services;

use App\Repositories\Interfaces\OrderRepositoryInterface;
use App\Repositories\Interfaces\PaymentRepositoryInterface;

class OrderService
{
    protected $orderRepository;
    protected $paymentRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        PaymentRepositoryInterface $paymentRepository
    ) {
        $this->orderRepository = $orderRepository;
        $this->paymentRepository = $paymentRepository;
    }

    /**
     * Lấy chi tiết đơn hàng dựa trên ID hoặc tracking code.
     */
    public function getOrderDetails($idOrTrackingCode)
    {
        $order = is_numeric($idOrTrackingCode)
            ? $this->orderRepository->findOrderById($idOrTrackingCode)
            : $this->orderRepository->findOrderByTrackingCode($idOrTrackingCode);

        if (!$order) {
            throw new \Exception("Order not found.");
        }

        return $order;
    }

    /**
     * Hủy đơn hàng.
     */
    public function cancelOrder($orderId)
    {
        $order = $this->orderRepository->findOrderById($orderId);

        if (!$order) {
            throw new \Exception("Order not found.");
        }

        if ($order->status === 'canceled') {
            throw new \Exception("Order already canceled.");
        }

        if ($order->shipping_status === 'delivered') {
            throw new \Exception("Cannot cancel a delivered order.");
        }

        // Update order status to canceled
        $this->orderRepository->updateOrder($order, [
            'status' => 'canceled',
            'cancel_time' => now(),
        ]);

        // Refund payment if paid
        if ($order->payment && $order->payment->payment_status === 'paid') {
            $this->paymentRepository->updatePayment($order->payment, [
                'refund_status' => 'requested',
            ]);
        }
    }

    /**
     * Theo dõi trạng thái vận chuyển của đơn hàng.
     */
    public function trackOrder($trackingCode)
    {
        $order = $this->orderRepository->findOrderByTrackingCode($trackingCode);

        if (!$order) {
            throw new \Exception("Order not found.");
        }

        return [
            'tracking_code' => $order->tracking_code,
            'shipping_status' => $order->shipping_status,
            'estimated_delivery_time' => $order->estimated_delivery_time,
            'tracking_url' => $order->tracking_url,
        ];
    }
}
