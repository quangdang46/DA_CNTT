<?php

namespace App\Repositories;

use App\Models\Order;
use App\Models\OrderItem;
use App\Repositories\Interfaces\OrderRepositoryInterface;

class OrderRepository implements OrderRepositoryInterface
{
    protected $order;
    protected $orderItem;
    public function __construct(Order $order, OrderItem $orderItem)
    {
        $this->order = $order;
        $this->orderItem = $orderItem;
    }
    public function createOrder(array $data)
    {
        return $this->order->create($data);
    }

    public function createOrderItem(array $data)
    {
        return $this->orderItem->create($data);
    }

    public function updateOrder(Order $order, array $data)
    {
        return $order->update($data);
    }




    public function findOrderById($orderId)
    {
        return $this->order->find($orderId);
    }

    public function findOrderByTrackingCode($trackingCode)
    {
        return $this->order->where('tracking_code', $trackingCode)->first();
    }

    public function getOrders($userId)
    {
        return $this->order->where('user_id', $userId)->get();
    }
}
