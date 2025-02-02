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
                // $guestId = $request->cookie('guest_id') ?? Str::uuid();
                $guestId = $request->header('X-Guest-ID') ?? Str::uuid();
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
            ])->header('X-Guest-ID', $guestId);
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
                $guestId = $request->header('X-Guest-ID');
                $userId = null; // Khách chưa đăng nhập
            }
            // Lấy thông tin sản phẩm
            $productId = $request->input('product_id');
            $quantity = $request->input('quantity', 1);

            // Thêm sản phẩm vào giỏ hàng
            $cart = $this->cartService->addItemToCart($userId, $guestId, $productId, $quantity);
            return response()->json([
                "success" => true,
                "status" => "success",
                "message" => "Thêm sản phẩm vào giỏ hàng thành công",
                "data" => $cart,
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
                // $guestId = $request->cookie('guest_id'); // Lấy UUID từ cookie
                $guestId = $request->header('X-Guest-ID');
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
                "data" => [
                    "message" => $result ? "Xóa sản phẩm khỏi giỏ hàng thanh cong" : "Không tìm thấy sản phẩm",
                    "success" => $result,
                ],
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
                // $guestId = $request->cookie('guest_id'); // Lấy UUID từ cookie
                $guestId = $request->header('X-Guest-ID');
                $userId = null; // Khách chưa đăng nhập
            }

            // Xóa toàn bộ giỏ hàng
            $result = $this->cartService->clearCart($userId, $guestId);

            return response()->json([
                "success" => $result,
                "status" => $result ? "success" : "error",
                "message" => $result ? "Giỏ hàng đã được làm sạch" : "Không tìm thấy giỏ hàng",
                "data" => [
                    "message" => $result ? "Giỏ hàng được làm sạch" : "Không tìm thấy giỏ hàng",
                    "success" => $result,
                ],
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


    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public function updateQuantity(Request $request)
    {
        try {
            // Kiểm tra người dùng đã đăng nhập chưa
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
                $guestId = null; // Không cần UUID nếu đã đăng nhập
            } catch (JWTException $e) {
                $guestId = $request->header('X-Guest-ID');
                $userId = null; // Khách chưa đăng nhập
            }

            // Lấy thông tin sản phẩm và số lượng
            $productId = $request->input('product_id');
            $quantity = $request->input('quantity');

            if ($quantity <= 0) {
                return response()->json([
                    "success" => false,
                    "status" => "error",
                    "message" => "Số lượng sản phẩm phải lớn hơn 0",
                    "data" => null,
                ]);
            }

            // Cập nhật số lượng sản phẩm trong giỏ hàng
            $cart = $this->cartService->updateItemQuantity($userId, $guestId, $productId, $quantity);

            return response()->json([
                "success" => true,
                "status" => "success",
                "message" => "Cập nhật số lượng sản phẩm thành công",
                "data" => [
                    'product_id' => $productId,
                    'quantity' => $quantity,
                ],
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

    // Chuyển giỏ hàng từ guest sang user (khi đăng nhập)
    public function mergeCart(Request $request)
    {
        try {
            // Lấy thông tin người dùng đã đăng nhập
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
            } catch (\Throwable $th) {
                $userId = null;
            }


            // Lấy guest_id từ header
            $guestId = $request->header('X-Guest-ID');

            if (!$guestId) {
                return response()->json([
                    "success" => false,
                    "status" => "error",
                    "message" => "Không tìm thấy guest_id.",
                    "data" => null,
                ]);
            }
            // Gộp giỏ hàng
            $result = $this->cartService->mergeCart($userId, $guestId);

            return response()->json([
                "success" => true,
                "status" => "success",
                "message" => "Success merge cart",
                "data" => $result,
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

    // Chuyển giỏ hàng từ user sang guest (khi đăng xuất)
    public function transferCartToGuest(Request $request)
    {
        try {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
            } catch (\Throwable $th) {
                return response()->json([
                    "success" => false,
                    "status" => "error",
                    "message" => $th->getMessage(),
                    "data" => null,
                ]);
            }


            // Lấy hoặc tạo guest_id
            $guestId = $request->header('X-Guest-ID') ?? Str::uuid();

            // Chuyển giỏ hàng
            $result = $this->cartService->transferCartToGuest($userId, $guestId);

            return response()->json([
                "success" => true,
                "status" => "success",
                "message" => "Chuyển giỏ hàng sang chế độ khách thành công.",
                "data" => [
                    "guest_id" => $guestId,
                    "result" => $result,
                ],
            ])->header('X-Guest-ID', $guestId);
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
