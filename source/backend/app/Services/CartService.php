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
            return ['id' => $cart->id, 'user' => $userId, 'guest' => $guestId];
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


    // Gộp giỏ hàng từ guest sang user
    public function mergeCart($userId, $guestId)
    {
        // Lấy giỏ hàng của guest
        $guestCart = $this->cartRepository->getCart(null, $guestId);
        if (!$guestCart) {
            return [
                "success" => false,
                "message" => "Không tìm thấy giỏ hàng của khách.",
                "data" => null,
            ];
        }

        // Lấy giỏ hàng của user
        $userCart = $this->cartRepository->getCart($userId, null);
        if (!$userCart) {
            // Nếu user chưa có giỏ hàng, chuyển giỏ hàng của guest sang user
            $this->cartRepository->updateCart($guestCart->id, ['user_id' => $userId, 'guest_id' => null]);
            return [
                "success" => true,
                "message" => "Giỏ hàng của khách đã được chuyển sang người dùng.",
                "data" => [
                    "merged_items" => count($guestCart->items),
                ],
            ];
        }

        // Gộp sản phẩm từ giỏ hàng của guest vào giỏ hàng của user
        $mergedItemsCount = 0;
        foreach ($guestCart->items as $item) {
            if ($item->quantity <= 0) {
                continue; // Bỏ qua sản phẩm có số lượng không hợp lệ
            }

            $existingItem = $userCart->items->firstWhere('product_id', $item->product_id);

            if ($existingItem) {
                // Nếu sản phẩm đã tồn tại, cộng dồn số lượng
                $existingItem->quantity += $item->quantity;
                $existingItem->save();
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng của user
                $this->cartRepository->addItem($userCart->id, $item->product_id, $item->quantity);
            }
            $mergedItemsCount++;
        }



        // Xóa giỏ hàng của guest
        $this->cartRepository->deleteCart($guestCart->id);

        return [
            "merged_items" => $mergedItemsCount,
        ];
    }

    // Chuyển giỏ hàng từ user sang guest
    public function transferCartToGuest($userId, $guestId)
    {
        // Lấy giỏ hàng của user
        $userCart = $this->cartRepository->getCart($userId, null);
        if (!$userCart) {
            return; // Không có giỏ hàng của user
        }

        // Lấy giỏ hàng của guest
        $guestCart = $this->cartRepository->getCart(null, $guestId);
        if (!$guestCart) {
            // Nếu guest chưa có giỏ hàng, chuyển giỏ hàng của user sang guest
            $this->cartRepository->updateCart($userCart->id, ['user_id' => null, 'guest_id' => $guestId]);
            return;
        }

        // Gộp sản phẩm từ giỏ hàng của user vào giỏ hàng của guest
        foreach ($userCart->items as $item) {
            $existingItem = $guestCart->items->firstWhere('product_id', $item->product_id);
            if ($existingItem) {
                // Nếu sản phẩm đã tồn tại, cộng dồn số lượng
                $existingItem->quantity += $item->quantity;
                $existingItem->save();
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng của guest
                $this->cartRepository->addItem($guestCart->id, $item->product_id, $item->quantity);
            }
        }

        // Xóa giỏ hàng của user
        $this->cartRepository->deleteCart($userCart->id);
    }


    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public function updateItemQuantity($userId = null, $guestId = null, $productId, $quantity)
    {
        // Lấy giỏ hàng
        $cart = $this->getCart($userId, $guestId);

        if ($cart) {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            $existingItem = $cart->items->firstWhere('product_id', $productId);

            if ($existingItem) {
                // Cập nhật số lượng sản phẩm
                $existingItem->quantity = $quantity;
                $existingItem->save();
            } else {
                // Nếu không có sản phẩm trong giỏ, có thể thêm sản phẩm mới vào giỏ hàng
                $this->cartRepository->addItem($cart->id, $productId, $quantity);
            }

            return $cart;
        }

        return null; // Không tìm thấy giỏ hàng
    }
}
