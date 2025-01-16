<?php

namespace App\Repositories\Interfaces;

interface ProductRepositoryInterface
{
    public function search($keyword);
    public function filter($filters);
    public function findById($id);
    public function getNewProducts();
    public function getAllProducts();
}
