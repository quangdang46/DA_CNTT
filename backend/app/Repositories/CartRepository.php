<?php

namespace App\Repositories;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Repositories\Interfaces\CartRepositoryInterface;

class CartRepository implements CartRepositoryInterface
{
    protected $cart;
    protected $cartItem;
    protected $product;

    public function __construct(Cart $cart, CartItem $cartItem, Product $product)
    {
        $this->product = $product;
        $this->cart = $cart;
        $this->cartItem = $cartItem;
    }

    // Lấy giỏ hàng theo guest_id hoặc user_id
    public function getCart($userId = null, $guestId = null)
    {
        $query = $this->cart->with(['items.product.attributes', 'items.product.images']);

        if ($userId) {
            $query->where('user_id', $userId);
        } elseif ($guestId) {
            $query->where('guest_id', $guestId);
        }
        return $query->first();
    }

    // Tạo giỏ hàng mới
    public function createCart($userId = null, $guestId = null)
    {
        return $this->cart->create([
            'user_id' => $userId,
            'guest_id' => $guestId,
        ]);
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addItem($cartId, $productId, $quantity)
    {
        $cartItem = $this->cartItem->where([
            'cart_id' => $cartId,
            'product_id' => $productId,
        ])->first();

        if ($cartItem) {
            $cartItem->quantity += $quantity;
            $cartItem->save();
        } else {
            $cartItem = $this->cartItem->create([
                'cart_id' => $cartId,
                'product_id' => $productId,
                'quantity' => $quantity,
            ]);
        }
        // Lấy product kèm attributes và images
        $product = $this->product->with(['attributes', 'images'])->find($productId);

        // Gán product đã load quan hệ vào cartItem
        $cartItem->setRelation('product', $product);
        return $cartItem;
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function removeItem($cartId, $productId)
    {
        return $this->cartItem->where('cart_id', $cartId)
            ->where('product_id', $productId)
            ->delete();
    }

    // Xóa tất cả sản phẩm trong giỏ hàng
    public function clearCart($cartId)
    {
        return $this->cartItem->where('cart_id', $cartId)->delete();
    }
    // Cập nhật thông tin giỏ hàng
    public function updateCart($cartId, array $data)
    {
        return $this->cart->where('id', $cartId)->update($data);
    }

    // Xóa giỏ hàng
    public function deleteCart($cartId)
    {
        // Xóa tất cả các mục trong giỏ hàng
        $this->cartItem->where('cart_id', $cartId)->delete();

        // Xóa giỏ hàng
        return $this->cart->where('id', $cartId)->delete();
    }
}
