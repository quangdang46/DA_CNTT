<?php

namespace App\Repositories\Interfaces;

interface CartRepositoryInterface
{
    public function getCart($userId);
    public function createCart($userId);
    public function addItem($cartId, $productId, $quantity);
    public function removeItem($cartId, $productId);
    public function clearCart($cartId);
    public function getCartBySessionId($sessionId);
}
