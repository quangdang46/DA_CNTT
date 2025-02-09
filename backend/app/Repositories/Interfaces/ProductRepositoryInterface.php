<?php

namespace App\Repositories\Interfaces;

interface ProductRepositoryInterface
{
    public function getAllProducts($perPage = null);
    public function search($params);
    public function findBySlug($slug);
    public function getProductByType($type);
    public function related($slug);
    public function getInArray($ids, $perPage, $page);
    public function getProductsPaginate($perPage, $page);
}
