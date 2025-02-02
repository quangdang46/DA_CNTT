<?php

namespace App\Repositories\Interfaces;

interface OrderDiscountRepositoryInterface
{
    public function create(array $data);
    public function all();
    public function findByOrderId($order_id);
    public function update($id, array $data);
    public function delete($id);
}
