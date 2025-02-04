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

    // 2. Tạo đơn hàng
    public function createOrder($data)
    {
        $response = Http::withHeaders([
            'Token' => $this->apiToken,
        ])->post("{$this->apiUrl}/services/shipment/order", $data);

        return $response->json();
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
