<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function updatePaymentStatus(Request $request, $orderId)
    {
        try {
            $data = $request->only(['payment_status', 'transaction_id']);
            $this->paymentService->updatePaymentStatus($orderId, $data);

            return response()->json([
                'message' => 'Payment status updated successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update payment status',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
