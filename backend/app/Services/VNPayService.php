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

        // Thêm các tham số tùy chọn nếu có
        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        // Sắp xếp theo thứ tự và tạo query string
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

        // Tạo URL thanh toán
        $vnp_Url = $this->vnp_Url . "?" . $query;

        // Tính toán mã bảo mật (SecureHash)
        $vnpSecureHash = hash_hmac('sha512', $hashdata, $this->vnpHashSecret);
        $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;

        return $vnp_Url;
    }

    public function verifyPayment($data)
    {
        $vnpSecureHash = $data['vnp_SecureHash'];
        unset($data['vnp_SecureHash']);

        ksort($data);
        $query = http_build_query($data);
        $hashData = hash_hmac('sha512', $query, $this->vnpHashSecret);

        return $hashData === $vnpSecureHash;
    }
}
