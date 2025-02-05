<?php

namespace App\Http\Controllers;

use App\Services\CheckoutService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;
class CheckoutController extends Controller
{
    protected $checkoutService;

    public function __construct(CheckoutService $checkoutService)
    {
        $this->checkoutService = $checkoutService;
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
                'user_id' => 'nullable|exists:users,id',
                'guest_id' => 'nullable|string|unique:orders,guest_id',
                'customer_name' => 'required|string|max:255',
                'customer_email' => 'nullable|email|max:255',
                'customer_phone' => 'required|string|max:20',
                'address_id' => 'nullable|exists:user_addresses,id',
                'shipping_address' => 'required_if:address_id,null|array',
                'shipping_address.city' => 'required_if:address_id,null|string|max:255',
                'shipping_address.district' => 'required_if:address_id,null|string|max:255',
                'shipping_address.ward' => 'required_if:address_id,null|string|max:255',
                'shipping_address.address' => 'required_if:address_id,null|string|max:255',
                'order_items' => 'required|array|min:1',
                'order_items.*.product_id' => 'required|exists:products,id',
                'order_items.*.quantity' => 'required|integer|min:1',
                'order_items.*.price' => 'required|numeric|min:0',
                'total_price' => 'required|numeric|min:0',
                'shipping_partner' => 'required|string|in:GHN,GHTK',
                'shipping_fee' => 'required|numeric|min:0',
                'payment_method' => 'required|string|in:QR,cash',
                'payment_gateway' => 'nullable|string|in:VNPay,Momo',
                'coupon_code' => 'nullable|string|max:255',
            ]);
            return $validated;
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage(),
            ]);
        }
    }
}
