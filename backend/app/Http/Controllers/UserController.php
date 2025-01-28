<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMeRequest;
use App\Services\UserService;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    protected $userService;
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng từ token
        } catch (JWTException $e) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => 'User not authenticated',
                'data' => null
            ]);
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'User information',
            'data' => [
                'user' => $user,
                'role' => $user->role
            ]
        ]);
    }


    public function updateMe(UpdateMeRequest $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng từ token

            // Nếu người dùng không xác thực được
            if (!$user) {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'User not authenticated',
                    'data' => null
                ]);
            }

            // Nếu người dùng có cung cấp mật khẩu hiện tại, kiểm tra mật khẩu
            if ($request->password) {
                if (!Hash::check($request->password, $user->password)) {
                    return response()->json([
                        "success" => false,
                        'status' => 'error',
                        'message' => 'Password is incorrect',
                        'data' => null
                    ]);
                }
            }

            $data = $request->except(['password_1', 'password_2']); // Loại bỏ password_1 và password_2 khỏi dữ liệu

            // Nếu người dùng cung cấp mật khẩu mới, kiểm tra và cập nhật mật khẩu
            if ($request->password_1 && $request->password_1 === $request->password_2) {
                // Nếu password_1 và password_2 khớp, cập nhật mật khẩu mới
                $data['password'] = Hash::make($request->password_1);
            } else {
                // Nếu không thay đổi mật khẩu, không thêm trường 'password' vào $data
                unset($data['password']); // Đảm bảo không có trường password rỗng
            }

            // Cập nhật các thông tin khác (ngoại trừ mật khẩu) vào cơ sở dữ liệu
            $updatedUser = $this->userService->update($user->id, $data);
        } catch (JWTException $e) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => 'User not authenticated ' . $e,
                'data' => null
            ]);
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'User information updated successfully',
            'data' => [
                'user' => $updatedUser
            ]
        ]);
    }
}
