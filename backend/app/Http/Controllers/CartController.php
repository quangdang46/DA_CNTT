<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    // Lấy giỏ hàng
    public function getCart(Request $request)
    {
        try {
            // Kiểm tra người dùng đã đăng nhập chưa
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
                $guestId = null; // Không cần UUID nếu đã đăng nhập
            } catch (JWTException $e) {
                $guestId = $request->cookie('guest_id') ?? Str::uuid(); // Lấy hoặc tạo UUID
                $userId = null; // Khách chưa đăng nhập
            }

            // Lấy giỏ hàng
            $cart = $this->cartService->getCart($userId, $guestId);

            // Trả về response kèm cookie guest_id nếu cần
            return response()->json([
                "success" => true,
                "status" => "success",
                "message" => "Get cart successfully",
                "data" => $cart,
            ])->withCookie(cookie('guest_id', $guestId, 60 * 24)); // Lưu UUID trong 1 ngày
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => $th->getMessage(),
                "data" => null,
            ]);
        }
    }

    // Thêm sản phẩm vào giỏ hàng
    public function addItem(Request $request)
    {
        try {
            // Kiểm tra người dùng đã đăng nhập chưa
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
                $guestId = null; // Không cần UUID nếu đã đăng nhập
            } catch (JWTException $e) {
                $guestId = $request->cookie('guest_id') ?? Str::uuid(); // Lấy hoặc tạo UUID
                $userId = null; // Khách chưa đăng nhập
            }

            // Lấy thông tin sản phẩm
            $productId = $request->input('product_id');
            $quantity = $request->input('quantity', 1);

            // Thêm sản phẩm vào giỏ hàng
            $cart = $this->cartService->addItemToCart($userId, $guestId, $productId, $quantity);

            // Trả về response kèm cookie guest_id nếu cần
            return response()->json([
                "success" => true,
                "status" => "success",
                "message" => "Thêm sản phẩm vào giỏ hàng thành công",
                "data" => $cart,
            ])->withCookie(cookie('guest_id', $guestId, 60 * 24)); // Lưu UUID trong 1 ngày
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => $th->getMessage(),
                "data" => null,
            ]);
        }
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function removeItem(Request $request)
    {
        try {
            // Kiểm tra người dùng đã đăng nhập chưa
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
                $guestId = null; // Không cần UUID nếu đã đăng nhập
            } catch (JWTException $e) {
                $guestId = $request->cookie('guest_id'); // Lấy UUID từ cookie
                $userId = null; // Khách chưa đăng nhập
            }

            // Lấy sản phẩm cần xóa
            $productId = $request->input('product_id');

            // Xóa sản phẩm khỏi giỏ hàng
            $result = $this->cartService->removeItemFromCart($userId, $guestId, $productId);

            return response()->json([
                "success" => $result,
                "status" => $result ? "success" : "error",
                "message" => $result ? "Xóa sản phẩm khỏi giỏ hàng thành công" : "Không tìm thấy sản phẩm",
                "data" => null,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => $th->getMessage(),
                "data" => null,
            ]);
        }
    }

    // Xóa toàn bộ giỏ hàng
    public function clearCart(Request $request)
    {
        try {
            // Kiểm tra người dùng đã đăng nhập chưa
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
                $guestId = null; // Không cần UUID nếu đã đăng nhập
            } catch (JWTException $e) {
                $guestId = $request->cookie('guest_id'); // Lấy UUID từ cookie
                $userId = null; // Khách chưa đăng nhập
            }

            // Xóa toàn bộ giỏ hàng
            $result = $this->cartService->clearCart($userId, $guestId);

            return response()->json([
                "success" => $result,
                "status" => $result ? "success" : "error",
                "message" => $result ? "Giỏ hàng đã được làm sạch" : "Không tìm thấy giỏ hàng",
                "data" => null,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => $th->getMessage(),
                "data" => null,
            ]);
        }
    }
}
