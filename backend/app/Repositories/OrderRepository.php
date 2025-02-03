<?php

namespace App\Repositories;

use App\Models\Order;
use App\Repositories\Interfaces\OrderRepositoryInterface;

class OrderRepository implements OrderRepositoryInterface
{
    protected $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }
    public function createOrder(array $data)
    {
        return $this->order->create($data);
    }

    public function updateOrder(Order $order, array $data)
    {
        return $order->update($data);
    }

    public function findOrderByGuestId(string $guestId)
    {
        return $this->order->where('guest_id', $guestId)->first();
    }

    public function findOrderByUserId(int $userId)
    {
        return $this->order->where('user_id', $userId)->first();
    }
    public function findOrderById($orderId)
    {
        return $this->order->find($orderId);
    }

    public function findOrderByTrackingCode($trackingCode)
    {
        return $this->order->where('tracking_code', $trackingCode)->first();
    }
}
