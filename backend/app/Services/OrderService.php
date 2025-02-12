<?php

namespace App\Services;

use App\Models\Payment;
use App\Repositories\Interfaces\OrderRepositoryInterface;
use App\Repositories\Interfaces\PaymentRepositoryInterface;
use Illuminate\Support\Facades\DB;

class OrderService
{
    protected $orderRepository;
    protected $paymentRepository;
    protected $discountService;
    protected $vnpayService;
    protected $ghtkService;
    public function __construct(
        OrderRepositoryInterface $orderRepository,
        PaymentRepositoryInterface $paymentRepository,
        DiscountService $discountRepository,
        VNPayService $vnpayService,
        GHTKService $ghtkService
    ) {
        $this->orderRepository = $orderRepository;
        $this->paymentRepository = $paymentRepository;
        $this->discountService = $discountRepository;
        $this->vnpayService = $vnpayService;
        $this->ghtkService = $ghtkService;
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

    public function checkout($validated)
    {
        foreach ($validated['order_items'] as $item) {
            $product = \App\Models\Product::find($item['product_id']);
            if (!$product) {
                return response()->json(['error' => "Sản phẩm {$product->name} không đủ hàng."], 400);
            }
        }
        DB::beginTransaction();
        try {
            $order = $this->orderRepository->createOrder($validated);
            foreach ($validated['order_items'] as $item) {
                \App\Models\OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'name' => $item['name'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }
            // Xử lý thanh toán (nếu phương thức là QR)
            if ($validated['payment_method'] === 'QR') {
                $txnRef = $order->id . '_' . time();
                $paymentUrl = $this->vnpayService->createPaymentUrl($txnRef, $validated['total_price']);
                // Lưu thông tin thanh toán
                $payment = $this->paymentRepository->createPayment([
                    'order_id' => $order->id,
                    'payment_method' => $validated['payment_method'],
                    'amount' => $validated['total_price'],
                    'payment_status' => 'pending',
                    'payment_gateway' => $validated['payment_gateway'],
                    'customer_name' => $validated['customer_name'],
                    'customer_email' => $validated['customer_email'],
                    'customer_phone' => $validated['customer_phone'],
                ]);
                DB::commit();
                return response()->json([
                    'success' => true,
                    'method' => $validated['payment_method'],
                    'payment_url' => $paymentUrl
                ]);
            }
            $shippingInfo = $this->ghtkService->createOrder($validated);
            $this->orderRepository->updateOrder($order, [
                'shipping_status' => 'pending',
                'payment_status' => 'pending',
                'estimated_deliver_time' => $shippingInfo['estimated_deliver_time'],
                'tracking_url' => $shippingInfo['tracking_url'],
                'tracking_code' => $shippingInfo['tracking_code'],
            ]);
            DB::commit();

            return response()->json([
                'success' => true,
                'method' => $validated['payment_method'],
                'tracking_code' => $shippingInfo['tracking_code'],
                'tracking_url' => $shippingInfo['tracking_url'],
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json(['success' => false, 'error' => 'Có lỗi xảy ra khi tạo đơn hàng.']);
        }
    }

    public function getOrders($userId)
    {
        return $this->orderRepository->getOrders($userId);
    }
}
