<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    public function me(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng từ token
        } catch (JWTException $e) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => 'User not authenticated',
                'data' => null
            ], 401);
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'User information',
            'data' => [
                'user' => $user
            ]
        ]);
    }
}
