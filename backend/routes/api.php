<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);  // Đăng ký
    Route::post('login', [AuthController::class, 'login']);        // Đăng nhập
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']); // Quên mật khẩu
    Route::post('reset-password', [AuthController::class, 'resetPassword']);   // Đặt lại mật khẩu

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);  // Đăng xuất
    });
});
