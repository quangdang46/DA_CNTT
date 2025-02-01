<?php

namespace App\Services;

use App\Repositories\Interfaces\CartRepositoryInterface;

class CartService
{
    protected $cartRepository;

    public function __construct(CartRepositoryInterface $cartRepository)
    {
        $this->cartRepository = $cartRepository;
    }

    // Lấy giỏ hàng
    public function getCart($userId = null, $guestId = null)
    {
        $cart = $this->cartRepository->getCart($userId, $guestId);
        // Nếu không tìm thấy giỏ hàng, tạo mới
        if (!$cart) {
            $cart = $this->cartRepository->createCart($userId, $guestId);
        }

        return $cart;
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addItemToCart($userId = null, $guestId = null, $productId, $quantity)
    {
        // Lấy hoặc tạo giỏ hàng
        $cart = $this->getCart($userId, $guestId);
        if (!$cart) {
            $cart = $this->cartRepository->createCart($userId, $guestId);
            return ['id' => $cart->id,'user'=>$userId,'guest'=>$guestId];
        }
        // Thêm sản phẩm vào giỏ hàng
        return $this->cartRepository->addItem($cart->id, $productId, $quantity);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function removeItemFromCart($userId = null, $guestId = null, $productId)
    {
        // Lấy giỏ hàng
        $cart = $this->getCart($userId, $guestId);

        if ($cart) {
            return $this->cartRepository->removeItem($cart->id, $productId);
        }

        return false; // Không tìm thấy giỏ hàng
    }

    // Xóa toàn bộ giỏ hàng
    public function clearCart($userId = null, $guestId = null)
    {
        // Lấy giỏ hàng
        $cart = $this->getCart($userId, $guestId);

        if ($cart) {
            return $this->cartRepository->clearCart($cart->id);
        }

        return false; // Không tìm thấy giỏ hàng
    }
}
