<?php

namespace App\Repositories\Interfaces;

interface ProductRepositoryInterface
{
    public function getAllProducts($perPage = null);
    public function search($params);
    public function findById($id);
    public function getNewProducts();
    public function getHighRatedProducts();
}
