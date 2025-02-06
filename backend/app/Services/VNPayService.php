<?php

namespace App\Services;

use App\Repositories\Interfaces\OrderRepositoryInterface;
use Illuminate\Support\Facades\Config;

/**
 * Class VNPayService
 * @package App\Services
 */
class VNPayService
{
    protected $vnp_TmnCode;
    protected $vnpHashSecret;
    protected $vnp_Url;
    protected $vnp_ReturnUrl;
    protected $ghtkService;
    protected $orderRepository;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        GHTKService $ghtkService

    ) {
        $this->vnp_TmnCode = Config::get('services.vnpay.tmn_code');
        $this->vnpHashSecret = Config::get('services.vnpay.hash_secret');
        $this->vnp_Url = Config::get('services.vnpay.url');
        $this->vnp_ReturnUrl = Config::get('services.vnpay.return_url');
        $this->ghtkService = $ghtkService;
        $this->orderRepository = $orderRepository;
    }


    public function createPaymentUrl($orderInfo, $amount)
    {

        $vnp_TxnRef = $orderInfo; // Mã đơn hàng
        $vnp_OrderInfo = "Thanh toán đơn hàng " . $orderInfo;
        $vnp_Amount = $amount * 100; // Số tiền VNPay tính theo VND * 100
        $vnp_Locale = "vn";
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];
        $vnp_OrderType = "billpayment";
        $vnp_BankCode = "NCB";
        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $this->vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $this->vnp_ReturnUrl,
            "vnp_TxnRef" => $vnp_TxnRef

        ];

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }


        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }
        $vnp_Url = $this->vnp_Url . "?" . $query;

        $vnpSecureHash = hash_hmac('sha512', $hashdata, $this->vnpHashSecret);
        $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;

        return $vnp_Url;
    }

    public function verifyPayment($data)
    {
        if (!isset($data['vnp_TxnRef']) || !isset($data['vnp_SecureHash'])) {
            return response()->json(['success' => false, 'message' => 'không hợp lệ']);
        }
        $txnParts = explode('_', $data['vnp_TxnRef']);
        $orderId = $txnParts[0] ?? null; // Lấy ID đơn hàng
        try {
            $order = \App\Models\Order::where('id', $orderId)->first();
            if (!$order) {
                return response()->json(['success' => false, 'message' => 'Không tìm thấy đơn hàng'], 404);
            }
            if ($order->total_price * 100 != $data['vnp_Amount']) {
                return response()->json(['success' => false, 'message' => 'Số tiền thanh toán không hợp lệ'], 400);
            }

            if ($data['vnp_ResponseCode'] === '00' && $data['vnp_TransactionStatus'] === '00') {
                $orderUpdate = $order->update([
                    'status' => 'paid',
                    'payment_status' => 'completed',
                    'transaction_id' => $data['vnp_TransactionNo'],
                ]);
                // data for ghtk service
                // $shippingInfo = $this->ghtkService->createOrder($validated);
                // $this->orderRepository->updateOrder($order, [
                //     'shipping_status' => 'pending',
                //     'estimated_deliver_time' => $shippingInfo['estimated_deliver_time'],
                //     'tracking_url' => $shippingInfo['tracking_url'],
                //     'tracking_code' => $shippingInfo['tracking_code'],
                // ]);

                // return response()->json(['success' => true, 'message' => 'Thanh toán thành công']);
            } else {
                // Cập nhật đơn hàng thất bại
                $order->update([
                    'status' => 'canceled',
                    'payment_status' => 'failed',
                ]);

                return response()->json(['success' => false, 'message' => 'Update order failed']);
            }
        } catch (\Throwable $th) {
            return response()->json(['success' => false, 'message' => 'Payment failed']);
        }
    }
}
