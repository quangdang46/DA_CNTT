<?php

namespace App\Repositories;

use App\Models\Cart;
use App\Models\CartItem;
use App\Repositories\Interfaces\CartRepositoryInterface;

class CartRepository  implements CartRepositoryInterface
{
    protected $cart;
    protected $cartItem;
    public function __construct(Cart $cart, CartItem $cartItem)
    {
        $this->cart = $cart;
        $this->cartItem = $cartItem;
    }
    public function getCartBySessionId($sessionId)
    {
        return $this->cart->where('session_id', $sessionId)->first();
    }
    // Lấy giỏ hàng của người dùng
    public function getCart($userId)
    {
        return $this->cart->with('items.product')->where('user_id', $userId)->first();
    }

    // Tạo giỏ hàng mới
    public function createCart($userId = null)
    {
        $cart = $this->cart->create(['user_id' => $userId]);
        return $cart;
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addItem($cartId, $productId, $quantity)
    {
        $cartItem = $this->cartItem->updateOrCreate(
            ['cart_id' => $cartId, 'product_id' => $productId],
            ['quantity' => $quantity]
        );

        return $cartItem;
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function removeItem($cartId, $productId)
    {
        return $this->cartItem->where('cart_id', $cartId)->where('product_id', $productId)->delete();
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    public function clearCart($cartId)
    {
        return $this->cartItem->where('cart_id', $cartId)->delete();
    }
}
