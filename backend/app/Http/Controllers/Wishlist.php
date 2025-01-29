<?php

namespace App\Http\Controllers;

use App\Services\WishlistService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class Wishlist extends Controller
{
    //

    protected $wishlistService;

    public function __construct(WishlistService $wishlistService)
    {
        $this->wishlistService = $wishlistService;
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
}
