<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\VNPayService;

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
        $isValid = $this->vnPayService->verifyPayment($request->all());

        if ($isValid) {
            // Xử lý đơn hàng thành công
            return response()->json(['message' => 'Payment successful']);
        } else {
            // Xử lý đơn hàng thất bại
            return response()->json(['message' => 'Payment failed'], 400);
        }
    }
}
