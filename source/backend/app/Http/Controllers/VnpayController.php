<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\VNPayService;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;

class VNPayController extends Controller
{
    protected $vnPayService;

    public function __construct(VNPayService $vnPayService)
    {
        $this->vnPayService = $vnPayService;
    }

    public function createPayment(Request $request)
    {
        $orderInfo = "Thanh toán đơn hàng";
        $amount = $request->amount;

        $paymentUrl = $this->vnPayService->createPaymentUrl($orderInfo, $amount);
        return redirect($paymentUrl);
    }
    public function paymentReturn(Request $request)
    {
        // Kiểm tra người dùng đã đăng nhập chưa
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $userId = $user->id;
            $guestId = null; // Không cần UUID nếu đã đăng nhập
        } catch (JWTException $e) {
            // $guestId = $request->cookie('guest_id') ?? Str::uuid();
            $guestId = $request->header('X-Guest-ID') ?? Str::uuid();
            $userId = null; // Khách chưa đăng nhập
        }
        $isValid = $this->vnPayService->verifyPayment($userId,$guestId,$request->all());
        return $isValid;
        if ($isValid) {
            // Xử lý đơn hàng thành công
            return response()->json(['message' => 'Payment successful']);
        } else {
            // Xử lý đơn hàng thất bại
            return response()->json(['message' => 'Payment failed'], 400);
        }
    }
}
