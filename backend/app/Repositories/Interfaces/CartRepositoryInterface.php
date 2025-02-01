<?php

namespace App\Repositories\Interfaces;

interface CartRepositoryInterface
{
    public function getCart($userId = null, $guestId = null);
    public function createCart($userId = null, $guestId = null);
    public function addItem($cartId, $productId, $quantity);
    public function removeItem($cartId, $productId);
    public function clearCart($cartId);
}
