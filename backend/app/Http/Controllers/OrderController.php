<?php

namespace App\Http\Controllers;

use App\Services\GHTKService;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;
    protected $ghtkService;

    public function __construct(OrderService $orderService, GHTKService $ghtkService)
    {
        $this->orderService = $orderService;
        $this->ghtkService = $ghtkService;
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

    public function calculateShippingFee(Request $request)
    {
        $data = [
            "pick_province" => $request->pick_province,
            "pick_district" => $request->pick_district,
            "province" => $request->province,
            "district" => $request->district,
            "weight" => $request->weight,
        ];

        $result = $this->ghtkService->calculateShippingFee($data);
        return response()->json($result);
    }

    public function createOrder(Request $request)
    {
        $data = [
            "products" => $request->products,
            "order" => [
                "id" => $request->order_id,
                "pick_name" => $request->pick_name,
                "pick_address" => $request->pick_address,
                "pick_province" => $request->pick_province,
                "pick_district" => $request->pick_district,
                "pick_ward" => $request->pick_ward,
                "pick_tel" => $request->pick_tel,
                "tel" => $request->tel,
                "name" => $request->name,
                "address" => $request->address,
                "province" => $request->province,
                "district" => $request->district,
                "ward" => $request->ward,
                "hamlet" => "Khác",
                "is_freeship" => "0",
                "weight" => $request->weight,
            ],
        ];

        $result = $this->ghtkService->createOrder($data);
        return response()->json($result);
    }
}
