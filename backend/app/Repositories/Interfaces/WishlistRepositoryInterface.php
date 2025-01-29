<?php

namespace App\Repositories\Interfaces;

interface WishlistRepositoryInterface
{
    public function getAll($userId);
    public function addOrRemove($userId, $productId);
}
