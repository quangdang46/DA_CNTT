<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');  // Đăng xuất
    Route::post('register', [AuthController::class, 'register']);  // Đăng ký
    Route::post('login', [AuthController::class, 'login']);        // Đăng nhập
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->name('password.reset'); // Quên mật khẩu
    Route::post('reset-password', [AuthController::class, 'resetPassword']);   // Đặt lại mật khẩu
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'account'
], function ($router) {
    Route::get('/me', [UserController::class, 'me']);
});


Route::group(
    [
        'prefix' => 'products',
    ],
    function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::post('byType', [ProductController::class, 'byType']);
        Route::get('search', [ProductController::class, 'search']);
        Route::get('new', [ProductController::class, 'new']);
        Route::get('{slug}', [ProductController::class, 'show']);
    }
);


/*
Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index']); // Xem giỏ hàng
    Route::post('add', [CartController::class, 'add']); // Thêm sản phẩm vào giỏ hàng
    Route::post('remove', [CartController::class, 'remove']); // Xóa sản phẩm khỏi giỏ hàng
    Route::post('update', [CartController::class, 'update']); // Cập nhật số lượng sản phẩm trong giỏ
    Route::post('clear', [CartController::class, 'clear']); // Xóa tất cả sản phẩm trong giỏ hàng
});

Route::prefix('orders')->group(function () {
    Route::post('create', [OrderController::class, 'create']); // Tạo đơn hàng mới
    Route::get('{id}', [OrderController::class, 'show']); // Xem chi tiết đơn hàng
    Route::get('/', [OrderController::class, 'index']); // Xem tất cả đơn hàng của khách
    Route::post('payment', [OrderController::class, 'payment']); // Thanh toán đơn hàng
});

Route::prefix('account')->group(function () {
    Route::get('profile', [AccountController::class, 'profile']); // Xem và cập nhật thông tin tài khoản
    Route::post('update', [AccountController::class, 'update']); // Cập nhật thông tin tài khoản
    Route::get('orders', [AccountController::class, 'orders']); // Lịch sử đơn hàng
    Route::get('wishlist', [AccountController::class, 'wishlist']); // Danh sách yêu thích
});
Route::prefix('comments')->group(function () {
    Route::get('/', [CommentController::class, 'index']); // Xem tất cả bình luận
    Route::post('approve', [CommentController::class, 'approve']); // Phê duyệt bình luận
    Route::post('reject', [CommentController::class, 'reject']); // Từ chối bình luận
});
Route::prefix('admin/products')->group(function () {
    Route::get('/', [ProductController::class, 'adminIndex']); // Xem tất cả sản phẩm (cho quản trị viên)
    Route::post('create', [ProductController::class, 'create']); // Thêm sản phẩm mới
    Route::post('update/{id}', [ProductController::class, 'update']); // Cập nhật thông tin sản phẩm
    Route::delete('delete/{id}', [ProductController::class, 'delete']); // Xóa sản phẩm
});

Route::prefix('admin/stock')->group(function () {
    Route::get('inventory', [StockController::class, 'index']); // Xem số lượng tồn kho
    Route::post('update/{productId}', [StockController::class, 'update']); // Cập nhật số lượng tồn kho
});
Route::prefix('delivery')->group(function () {
    Route::get('orders', [DeliveryController::class, 'orders']); // Xem danh sách đơn hàng cần giao
    Route::post('update/{orderId}', [DeliveryController::class, 'updateStatus']); // Cập nhật trạng thái giao hàng
});

*/
