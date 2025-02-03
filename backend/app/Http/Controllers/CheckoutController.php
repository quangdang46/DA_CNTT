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

            $data = $request->only([
                'customer_name',
                'customer_email',
                'customer_phone',
                'total_price',
                'shipping_fee',
                'address_id',
                'note',
                'payment_method',
            ]);

            $order = $this->checkoutService->processCheckout($data, $userId, $guestId);

            return response()->json([
                'message' => 'Checkout successful',
                'order' => $order,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Checkout failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
