<?php

namespace App\Http\Controllers;

use App\Services\GHTKService;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    protected $orderService;
    protected $ghtkService;

    public function __construct(OrderService $orderService, GHTKService $ghtkService)
    {
        $this->orderService = $orderService;
        $this->ghtkService = $ghtkService;
    }

    public function checkout(Request $request)
    {
        try {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
                $guestId = null; // Không cần UUID nếu đã đăng nhập
            } catch (JWTException $e) {
                // $guestId = $request->cookie('guest_id') ?? Str::uuid();
                $guestId = $request->header('X-Guest-ID') ?? Str::uuid();
                $userId = null; // Khách chưa đăng nhập
            }

            // Bước 1: Validate dữ liệu đầu vào
            $validated = $request->validate([
                'customer_name' => 'required|string|max:255',
                'customer_email' => 'nullable|email|max:255',
                'customer_phone' => 'required|string|max:20',
                'address_id' => 'nullable|exists:user_addresses,id',
                'shipping_address' => 'required_if:address_id,null|array',
                'shipping_address.province' => 'required_if:address_id,null|string|max:255',
                'shipping_address.district' => 'required_if:address_id,null|string|max:255',
                'shipping_address.ward' => 'required_if:address_id,null|string|max:255',
                'shipping_address.address' => 'required_if:address_id,null|string|max:255',
                'order_items' => 'required|array|min:1',
                'order_items.*.product_id' => 'required|exists:products,id',
                'order_items.*.quantity' => 'required|integer|min:1',
                'order_items.*.price' => 'required|numeric|min:0',
                'order_items.*.name' => 'required|string|max:255',
                "order_items.*.weight" => 'required|numeric|min:0',
                'total_price' => 'required|numeric|min:0',
                'shipping_partner' => 'required|string|in:GHN,GHTK',
                'shipping_fee' => 'required|numeric|min:0',
                'payment_method' => 'required|string|in:QR,cash',
                'payment_gateway' => 'nullable|string|in:VNPay,Momo',
                'coupon_code' => 'nullable|string|max:255',
            ]);
            $validated['user_id'] = $userId;
            $validated['guest_id'] = $guestId;
            $result = $this->orderService->checkout($validated);
            return $result;
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage(),
            ]);
        }
    }



    public function trackOrder(Request $request)
    {
        try {
            $trackingCode = $request->input('tracking_code');
            $result = $this->ghtkService->trackOrder($trackingCode);
            return $result;
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Track order failed',
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function getOrders()
    {
        try {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
            } catch (JWTException $e) {
                return response()->json([
                    'success' => false,
                    'message' => 'Get orders failed as user not logged in',
                    'error' => $e->getMessage(),
                ]);
            }

            $result = $this->orderService->getOrders($userId);
            return response()->json(
                [
                    'success' => true,
                    'message' => 'Get orders successfully',
                    'data' => $result
                ]
            );
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Get orders failed',
                'error' => $th->getMessage(),
            ]);
        }
    }
}
