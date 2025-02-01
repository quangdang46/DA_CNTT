<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Lấy giỏ hàng của người dùng
     */
    public function getCart(Request $request)
    {
        try {
            try {
                $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng từ token
            } catch (JWTException $e) {
                // Dùng session_id (hoặc IP) khi người dùng chưa đăng nhập
                $sessionId = $request->session()->getId(); // Hoặc có thể dùng $request->ip()
                if (!$sessionId) {
                    $sessionId = $request->ip(); // Dùng IP nếu không có session_id
                }
                $cart = $this->cartService->getCart($sessionId);
                return response()->json([
                    "success" => true,
                    'status' => 'success',
                    'message' => 'Get cart successfully',
                    'data' => $cart
                ]);
            }

            $userId = $user->id;
            $cart = $this->cartService->getCart($userId);
            return response()->json([
                "success" => true,
                'status' => 'success',
                'message' => 'Get cart successfully',
                'data' => $cart
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }

    /**
     * Thêm sản phẩm vào giỏ hàng
     */
    public function addItem(Request $request)
    {
        try {
            // Kiểm tra nếu người dùng đã đăng nhập thông qua JWT
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id; // Nếu có user, lấy user_id
            } catch (JWTException $e) {
                // Nếu không thể xác thực, coi là khách chưa đăng nhập và dùng IP làm user_id tạm
                $userId = $request->ip(); // Dùng IP để phân biệt giỏ hàng cho khách
            }

            // Lấy thông tin sản phẩm và số lượng từ request
            $productId = $request->input('product_id');
            $quantity = $request->input('quantity');

            // Thêm sản phẩm vào giỏ hàng
            $cart = $this->cartService->addItemToCart($userId, $productId, $quantity);

            return response()->json([
                "success" => true,
                'status' => 'success',
                'message' => 'Thêm sản phẩm vào giỏ hàng thành công',
                'data' => $cart
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }

    /**
     * Xóa sản phẩm khỏi giỏ hàng
     */
    public function removeItem(Request $request)
    {
        try {
            // Kiểm tra nếu người dùng đã đăng nhập thông qua JWT
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id; // Nếu có user, lấy user_id
            } catch (JWTException $e) {
                // Nếu không thể xác thực, coi là khách chưa đăng nhập và dùng IP làm user_id tạm
                $userId = $request->ip(); // Dùng IP để phân biệt giỏ hàng cho khách
            }

            // Lấy thông tin sản phẩm cần xóa
            $productId = $request->input('product_id');

            // Xóa sản phẩm khỏi giỏ hàng
            $cart = $this->cartService->removeItemFromCart($userId, $productId);

            return response()->json([
                "success" => true,
                'status' => 'success',
                'message' => 'Xóa sản phẩm khỏi giỏ hàng thành công',
                'data' => $cart
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }

    /**
     * Xóa toàn bộ sản phẩm trong giỏ hàng
     */
    public function clearCart(Request $request)
    {
        try {
            // Kiểm tra nếu người dùng đã đăng nhập thông qua JWT
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id; // Nếu có user, lấy user_id
            } catch (JWTException $e) {
                // Nếu không thể xác thực, coi là khách chưa đăng nhập và dùng IP làm user_id tạm
                $userId = $request->ip(); // Dùng IP để phân biệt giỏ hàng cho khách
            }

            // Xóa toàn bộ giỏ hàng
            $this->cartService->clearCart($userId);

            return response()->json([
                "success" => true,
                'status' => 'success',
                'message' => 'Giỏ hàng đã được làm sạch',
                'data' => null
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }
}
