<?php

namespace App\Repositories\Interfaces;

interface ProductDiscountRepositoryInterface
{
    public function create(array $data);
    public function all();
    public function findByProductId($product_id);
    public function update($id, array $data);
    public function delete($id);
}
