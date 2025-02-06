<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class GHTKService
{
    protected $apiUrl;
    protected $apiToken;

    public function __construct()
    {
        $this->apiUrl = config('ghtk.base_url');
        $this->apiToken = config('ghtk.api_token');
    }

    // 1. Tính phí vận chuyển
    public function calculateShippingFee($data)
    {
        $response = Http::withHeaders([
            'Token' => $this->apiToken,
        ])->get("{$this->apiUrl}/services/shipment/fee", $data);

        return $response->json();
    }


    private function getProductsData($order)
    {
        $products = [];
        foreach ($order as $item) {
            $products[] = [
                "name" => $item['name'] ?? "Sản phẩm",
                "weight" => $item['weight'] ?? 1, // Trọng lượng (gram)
                "quantity" => $item['quantity'], // Số lượng
                "product_code" => $item['product_id'], // Sửa lại dấu "->" thành "['']"
            ];
        }
        return $products;
    }
    // 2. Tạo đơn hàng
    public function createOrder($order)
    {
        // Chuẩn bị dữ liệu để gửi đến GHTK
        // return $this->getProductsData($order['order_items']);
        $data = [
            "products" => $this->getProductsData($order['order_items']),
            "order" => [
                "id" => Str::uuid(),
                "pick_name" => "DA_CNTT_15", // Tên người gửi
                "pick_address" => "Thành phố Hà Nội", // Địa chỉ người gửi
                "pick_province" => "Hà Nội", // Tỉnh/Thành phố người gửi
                "pick_district" => "Ba Đình", // Quận/Huyện người gửi
                "pick_tel" => "0999999999", // Số điện thoại người gửi
                "name" => $order['customer_name'], // Tên người nhận
                "address" => $order['shipping_address']['address'], // Địa chỉ người nhận
                "province" => $order['shipping_address']['province'], // Tỉnh/Thành phố người nhận
                "district" => $order['shipping_address']['district'], // Quận/Huyện người nhận
                'ward' => $order['shipping_address']['ward'],
                "tel" => $order['customer_phone'], // Số điện thoại người nhận
                "email" => $order['customer_email'], // Email người nhận
                "is_freeship" => "0", // Không miễn phí vận chuyển
                "hamlet" => "Khác",
                'value' => 3000000, //gia tri bao hiem
                "pick_money" => $order['total_price'] + $order['shipping_fee'], // Tính phi ván chuyen + phi bao hiem
                "note" => $order['note'] ?? "", // Ghi chú đơn hàng
                'order_type' => 'standard'
            ],
        ];
        $response = Http::withHeaders([
            'Token' => $this->apiToken,
        ])->post("{$this->apiUrl}/services/shipment/order", $data);
        // Kiểm tra phản hồi từ GHTK
        if ($response['success']) {
            return [
                'estimated_deliver_time' => $response['order']['estimated_deliver_time'],
                'tracking_code' => $response['order']['label'],
                'tracking_url' => "http://localhost:3000/track-order?orderid={$response['order']['label']}", // Đường dẫn theo dõi
            ];
        } else {
            throw new \Exception("Không thể tạo đơn hàng vận chuyển với GHTK: {$response->body()}");
        }
    }

    public function createOrderWithPay($data)
    {

        $response = Http::withHeaders([
            'Token' => $this->apiToken,
        ])->post("{$this->apiUrl}/services/shipment/order", $data);
        // Kiểm tra phản hồi từ GHTK
        if ($response['success']) {
            return [
                'estimated_deliver_time' => $response['order']['estimated_deliver_time'],
                'tracking_code' => $response['order']['label'],
                'tracking_url' => "http://localhost:3000/track-order?orderid={$response['order']['label']}", // Đường dẫn theo dõi
            ];
        } else {
            throw new \Exception("Không thể tạo đơn hàng vận chuyển với GHTK: {$response->body()}");
        }
    }



    // 3. Tra cứu trạng thái đơn hàng
    public function getOrderStatus($orderId)
    {
        $response = Http::withHeaders([
            'Token' => $this->apiToken,
        ])->get("{$this->apiUrl}/services/shipment/v2/" . $orderId);

        return $response->json();
    }
}
