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


    // Lấy giỏ hàng của người dùng
    public function getCart($userId)
    {
        if (!$userId) {
            // Khi không có userId (khách chưa đăng nhập), lấy cart qua session_id
            $sessionId = session()->getId(); // Hoặc có thể dùng IP
            return $this->cartRepository->getCartBySessionId($sessionId);
        }

        // Nếu có userId (người dùng đã đăng nhập), lấy cart qua userId
        return $this->cartRepository->getCart($userId);
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addItemToCart($userId, $productId, $quantity)
    {
        // Nếu không có userId (đối với khách hàng chưa đăng nhập)
        if (!$userId) {
            $sessionId = session()->getId(); // Hoặc dùng IP
            $cart = $this->cartRepository->getCartBySessionId($sessionId);
        } else {
            // Nếu có userId (đối với người dùng đã đăng nhập)
            $cart = $this->cartRepository->getCart($userId);
        }

        if (!$cart) {
            $cart = $this->cartRepository->createCart($userId, $sessionId);
        }

        return $this->cartRepository->addItem($cart->id, $productId, $quantity);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function removeItemFromCart($userId, $productId)
    {
        $cart = $this->cartRepository->getCart($userId);
        if ($cart) {
            return $this->cartRepository->removeItem($cart->id, $productId);
        }

        return null;
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    public function clearCart($userId)
    {
        $cart = $this->cartRepository->getCart($userId);
        if ($cart) {
            return $this->cartRepository->clearCart($cart->id);
        }

        return null;
    }
}
