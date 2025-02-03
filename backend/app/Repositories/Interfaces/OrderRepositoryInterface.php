<?php

namespace App\Repositories\Interfaces;

use App\Models\Order;

interface OrderRepositoryInterface
{

    public function createOrder(array $data);
    public function updateOrder(Order $order, array $data);
    public function findOrderByGuestId(string $guestId);
    public function findOrderByUserId(int $userId);
    public function findOrderById($orderId);
    public function findOrderByTrackingCode($trackingCode);
}
