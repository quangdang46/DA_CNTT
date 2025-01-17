<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);  // Đăng ký
    Route::post('login', [AuthController::class, 'login']);        // Đăng nhập
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('password.reset'); // Quên mật khẩu
    Route::post('reset-password', [AuthController::class, 'resetPassword']);   // Đặt lại mật khẩu

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);  // Đăng xuất
    });
});

Route::prefix("products")->group(function () {
    Route::get('search', [ProductController::class, 'search']);
    Route::get('new', [ProductController::class, 'new']);
    Route::get('{id}', [ProductController::class, 'show']);
    Route::get('/', [ProductController::class, 'index']);
});
