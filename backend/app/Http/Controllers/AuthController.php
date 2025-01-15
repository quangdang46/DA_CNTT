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

class AuthController extends Controller
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    /**
     * Đăng ký người dùng mới.
     */
    public function register(RegisterRequest $request)
    {
        $data = $request->only(['name', 'email', 'password']);
        $user = $this->userRepository->createUser($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Registration successful',
            'data' => [
                'user' => $user
            ]
        ], 201);
    }

    /**
     * Đăng nhập.
     */
    public function login(LoginRequest $request)
    {
        $user = $this->userRepository->authenticate($request->email, $request->password);

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials',
                'data' => null
            ], 401);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'data' => [
                'user' => $user->only(['id', 'name', 'email', 'role']),
                'token' => $token,
                'role' => $user->role
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
                'status' => 'error',
                'message' => 'User not found',
                'data' => null
            ], 404);
        }

        $status = Password::sendResetLink($request->only('email'));
        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'status' => 'success',
                'message' => 'Password reset link sent',
                'data' => null
            ], 200);
        }

        return response()->json([
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
                'status' => 'success',
                'message' => 'Password reset successful',
                'data' => null
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Password reset failed',
            'errors' => ['error' => $status],
            'data' => null
        ], 400);
    }

    /**
     * Đăng xuất người dùng.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully',
            'data' => null
        ]);
    }
}
