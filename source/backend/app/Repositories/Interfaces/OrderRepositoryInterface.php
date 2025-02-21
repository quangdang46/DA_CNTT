<?php

namespace App\Repositories\Interfaces;

use App\Models\Order;

interface OrderRepositoryInterface
{

    public function createOrder(array $data);
    public function createOrderItem(array $data);
    public function updateOrder(Order $order, array $data);
    public function findOrderById($orderId);
    public function findOrderByTrackingCode($trackingCode);
    public function getOrders($userId);
}
