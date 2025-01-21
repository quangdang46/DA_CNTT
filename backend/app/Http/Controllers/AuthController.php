<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken()); // Hủy token hiện tại
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'Could not invalidate token',
                'data' => null
            ], 500);
        }

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Logged out successfully',
            'data' => null
        ]);
    }

    /**
     * Đăng ký người dùng mới.
     */
    public function register(RegisterRequest $request)
    {
        // Kiểm tra xem email đã được đăng ký chưa
        $existingUser = $this->userRepository->getUserByEmail($request->email);
        if ($existingUser) {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'Email is already registered',
                'data' => null
            ], 400);
        }

        // Băm mật khẩu
        $data = $request->only(['name', 'email', 'password']);
        $data['password'] = Hash::make($data['password']); // Băm mật khẩu trước khi lưu

        // Tạo người dùng mới
        $user = $this->userRepository->createUser($data);

        // Tạo một token cho người dùng mới (nếu cần)
        // Nếu bạn muốn tự động đăng nhập người dùng sau khi đăng ký
        $token =
            $token = JWTAuth::claims([
                'id' => $user->id,      // ID của user
                'role' => $user->role,  // Role của user
            ])->fromUser($user);;

        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Registration successful',
            'data' => [
                'user' => $user,
                'token' => $token, // Bạn có thể trả về token nếu cần
            ]
        ], 201);
    }

    /**
     * Đăng nhập.
     */

    public function login(LoginRequest $request)
    {
        // Xác thực người dùng từ email và mật khẩu
        $user = $this->userRepository->authenticate($request->email, $request->password);

        if (!$user) {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'Invalid credentials',
                'data' => null
            ], 401);
        }

        try {
            // Tạo JWT token
            $token =
                $token = JWTAuth::claims([
                    'id' => $user->id,      // ID của user
                    'role' => $user->role,  // Role của user
                ])->fromUser($user);
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'Could not create token',
                'data' => null
            ], 500);
        }

        // Thời gian hết hạn token (30 ngày, có thể thay đổi)
        $expiresAt = now()->addMinutes(30 * 24)->timestamp;

        // Trả về token và thông tin người dùng
        return response()->json([
            'success' => true,
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'token' => $token,
                'user' => $user,
                'role' => $user->role,
                'expiresAt' => $expiresAt, // Thời gian hết hạn của token
            ]
        ]);
    }


    /**
     * Quên mật khẩu: Gửi email đặt lại mật khẩu.
     */
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $user = $this->userRepository->getUserByEmail($request->email);
        if (!$user) {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'User not found',
                'data' => null
            ], 404);
        }

        $status = Password::sendResetLink($request->only('email'));
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'Password reset link sent',
                'data' => null
            ], 200);
        }

        return response()->json([
            'success' => false,
            'status' => 'error',
            'message' => 'Unable to send reset link',
            'data' => null
        ], 400);
    }

    /**
     * Đặt lại mật khẩu.
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        if ($request->password !== $request->password_confirmation) {
            return response()->json([
                'success' => false,
                'status' => 'error',
                'message' => 'Passwords do not match',
                'data' => null
            ], 400);
        }
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {

                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'Password reset successful',
                'data' => null
            ], 200);
        }

        return response()->json([
            'success' => false,
            'status' => 'error',
            'message' => 'Password reset failed',
            'errors' => ['error' => $status],
            'data' => null
        ], 400);
    }
}
