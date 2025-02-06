<?php

namespace App\Services;

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

    public function __construct()
    {
        $this->vnp_TmnCode = Config::get('services.vnpay.tmn_code');
        $this->vnpHashSecret = Config::get('services.vnpay.hash_secret');
        $this->vnp_Url = Config::get('services.vnpay.url');
        $this->vnp_ReturnUrl = Config::get('services.vnpay.return_url');
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


        // $data['vnp_Version'] = '2.1.0';
        // $data['vnp_Command'] = 'pay';
        // $data['vnp_CurrCode'] = 'VND';
        // $data['vnp_IpAddr'] = $_SERVER['REMOTE_ADDR'];
        // $data['vnp_Locale'] = 'vn';
        // $data['vnp_ReturnUrl'] = $this->vnp_ReturnUrl;
        // $data['vnp_OrderType'] = 'billpayment';



        // $vnp_SecureHash = $data['vnp_SecureHash'];
        // unset($data['vnp_SecureHash']);
        // ksort($data);



        // $i = 0;
        // $hashData = "";
        // foreach ($data as $key => $value) {
        //     if ($i == 1) {
        //         $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
        //     } else {
        //         $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
        //         $i = 1;
        //     }
        // }
        // $secureHash = hash_hmac('sha512', $hashData, $this->vnpHashSecret);


        try {
            // if ($vnp_SecureHash != $secureHash) {
            //     return response()->json(['status' => 'fail', 'message' => 'Dữ liệu không hợp lệ'], 400);
            // }
            return "success";
        } catch (\Throwable $th) {
            //throw $th;
        }
        // // Lấy đơn hàng từ database
        // $order = Order::where('transaction_id', $data['vnp_TxnRef'])->first();
        // if (!$order) {
        //     return response()->json(['status' => 'fail', 'message' => 'Không tìm thấy đơn hàng'], 404);
        // }

        // // Kiểm tra số tiền có khớp không
        // if ($order->total_amount * 100 != $data['vnp_Amount']) {
        //     return response()->json(['status' => 'fail', 'message' => 'Số tiền thanh toán không hợp lệ'], 400);
        // }

        // // Kiểm tra trạng thái giao dịch
        // if ($data['vnp_ResponseCode'] === '00' && $data['vnp_TransactionStatus'] === '00') {
        //     // Cập nhật đơn hàng thành đã thanh toán
        //     $order->update([
        //         'status' => 'paid',
        //         'payment_status' => 'completed',
        //         'payment_method' => 'VNPay',
        //         'transaction_no' => $data['vnp_TransactionNo'],
        //         'paid_at' => now(),
        //     ]);

        //     return response()->json(['status' => 'success', 'message' => 'Thanh toán thành công']);
        // } else {
        //     // Cập nhật đơn hàng thất bại
        //     $order->update([
        //         'status' => 'failed',
        //         'payment_status' => 'failed',
        //     ]);

        //     return response()->json(['status' => 'fail', 'message' => 'Thanh toán thất bại']);
        // }
    }
}
