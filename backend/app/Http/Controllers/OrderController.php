<?php

namespace App\Http\Controllers;

use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function getOrderDetails($idOrTrackingCode)
    {
        try {
            $order = $this->orderService->getOrderDetails($idOrTrackingCode);

            return response()->json([
                'message' => 'Order details retrieved successfully',
                'order' => $order,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve order details',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function cancelOrder($orderId)
    {
        try {
            $this->orderService->cancelOrder($orderId);

            return response()->json([
                'message' => 'Order canceled successfully',
                'order_id' => $orderId,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to cancel order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function trackOrder($trackingCode)
    {
        try {
            $trackingInfo = $this->orderService->trackOrder($trackingCode);

            return response()->json([
                'message' => 'Tracking information retrieved successfully',
                'tracking_info' => $trackingInfo,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve tracking information',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
