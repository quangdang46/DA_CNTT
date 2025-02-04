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

        $vnp_TxnRef = time(); // Mã đơn hàng
        $vnp_OrderInfo = $orderInfo;
        $vnp_Amount = $amount * 100; // Số tiền VNPay tính theo VND * 100
        $vnp_Locale = "vn";
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_Command" => "pay",
            "vnp_TmnCode" => $this->vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_CurrCode" => "VND",
            "vnp_TxnRef" => $vnp_TxnRef,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_Locale" => $vnp_Locale,
            "vnp_ReturnUrl" => $this->vnp_ReturnUrl,
            "vnp_IpAddr" => $vnp_IpAddr,
        ];

        ksort($inputData);
        $query = http_build_query($inputData);
        $vnpSecureHash = hash_hmac('sha512', $query, $this->vnpHashSecret);

        return $this->vnp_Url . "?" . $query . "&vnp_SecureHash=" . $vnpSecureHash;
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
