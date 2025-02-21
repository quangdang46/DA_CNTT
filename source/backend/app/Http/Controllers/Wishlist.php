<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use App\Services\WishlistService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class Wishlist extends Controller
{
    //

    protected $wishlistService;
    protected $productService;

    public function __construct(WishlistService $wishlistService, ProductService $productService)
    {
        $this->wishlistService = $wishlistService;
        $this->productService = $productService;
    }
    public function index(Request $request)
    {

        try {
            $user =
                JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'status' => "error",
                    'message' => "user is required",
                    'data' => []
                ]);
            }
            $userId = $user->id;

            $wishlist = $this->wishlistService->getAllWishList($userId);
            return response()->json([
                'success' => true,
                'status' => "success",
                'message' => "success get wishlist",
                'data' => [
                    'user_id' => $userId,
                    'wishlist' => $wishlist

                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => "error",
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }

    public function toggleWishList(Request $request)
    {
        try {
            $user =
                JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'status' => "error",
                    'message' => "user is required",
                    'data' => []
                ]);
            }

            $userId = $user->id;
            $productId = $request->input('product_id');
            if (!$productId) {
                return response()->json([
                    'success' => false,
                    'status' => "error",
                    'message' => "product id is required",
                    'data' => []
                ]);
            }


            $message = $this->wishlistService->toggleWishList($userId, $productId);
            return response()->json([
                'success' => true,
                'status' => "success",
                'message' => $message,
                'data' => [
                    'product_id' => $productId,
                    'message' => $message
                ]
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => "error",
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }


    public function getWishlistProducts(Request $request)
    {
        try {
            $productIds = [];
            $user = null;
            try {
                // Cố gắng xác thực người dùng qua token
                $user = JWTAuth::parseToken()->authenticate();
            } catch (\Exception $e) {
                // Không có token hoặc token không hợp lệ
                // Nếu không có token, sẽ bỏ qua và trả về danh sách sản phẩm từ product_ids trong request
            }

            if ($user) {
                // Nếu đã đăng nhập, lấy wishlist của người dùng từ service
                $userId = $user->id;
                $productIds = $this->wishlistService->getAllWishList($userId);
            } else {
                // Nếu chưa đăng nhập, lấy product_ids từ request
                $productIds = $request->input('product_ids', []);
            }
            if (empty($productIds)) {
                return response()->json([
                    'success' => true,
                    'status' => "success empty",
                    'message' => " fetch ok",
                    'data' => []
                ]);
            }
            $perPage = $request->input('per_page', 3); // Mặc định 10 sản phẩm/trang
            $page = $request->input('page', 1);
            $products = $this->productService->getInforWithIds($productIds, $perPage, $page);
            return response()->json([
                'success' => true,
                'status' => "success ",
                'message' => " fetch ok",
                'data' => $products
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => "error",
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }
}
