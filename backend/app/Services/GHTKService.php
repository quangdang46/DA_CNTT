<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

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
        foreach ($order->items as $item) {
            $products[] = [
                "name" => $item->product->name, // Tên sản phẩm
                "weight" => $item->product->weight ?? 100, // Trọng lượng (gram)
                "quantity" => $item->quantity, // Số lượng
                "price" => $item->price, // Giá sản phẩm
            ];
        }
        return $products;
    }
    // 2. Tạo đơn hàng
    public function createOrder($order)
    {

        // Chuẩn bị dữ liệu để gửi đến GHTK
        $data = [
            "products" => $this->getProductsData($order),
            "order" => [
                "id" => $order->id,
                "pick_name" => "DA_CNTT_15", // Tên người gửi
                "pick_address" => "Thành phố Hà Nội", // Địa chỉ người gửi
                "pick_province" => "Hà Nội", // Tỉnh/Thành phố người gửi
                "pick_district" => "Ba Đình", // Quận/Huyện người gửi
                "tel" => "0123456789", // Số điện thoại người gửi
                "name" => $order->customer_name, // Tên người nhận
                "address" => $order->shipping_address['address'], // Địa chỉ người nhận
                "province" => $order->shipping_address['province'], // Tỉnh/Thành phố người nhận
                "district" => $order->shipping_address['district'], // Quận/Huyện người nhận
                'war' => $order->shipping_address['ward'],
                "phone" => $order->customer_phone, // Số điện thoại người nhận
                "is_freeship" => "0", // Không miễn phí vận chuyển
                "pick_money" => $order->total_price - $order->shipping_fee, // Tiền thu hộ (COD)
                "note" => $order->note ?? "", // Ghi chú đơn hàng
            ],
        ];
        return $data;

        $response = Http::withHeaders([
            'Token' => $this->apiToken,
        ])->post("{$this->apiUrl}/services/shipment/order", $data);

        // Kiểm tra phản hồi từ GHTK
        if ($response->successful()) {
            $responseData = $response->json();
            return [
                'tracking_code' => $responseData['order']['label'],
                'tracking_url' => "https://example.com/tracking/{$responseData['order']['label']}", // Đường dẫn theo dõi
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
