<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ApplyDiscountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderDiscountController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductDiscountController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VNPayController;
use App\Http\Controllers\Wishlist;
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
    Route::get("refreshToken", [AuthController::class, 'refreshToken']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'account'
], function ($router) {
    Route::get('/me', [UserController::class, 'me']);
    Route::put('/updateMe', [UserController::class, 'updateMe']);
    Route::get('/{id}/addresses', [UserController::class, 'getUserAddresses']);
});


Route::group(
    [
        'prefix' => 'products',
    ],
    function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::get('product-paginate', [ProductController::class, 'getProductsPaginate']);
        Route::post('byType', [ProductController::class, 'byType']);
        Route::get('search', [ProductController::class, 'search']);
        Route::get('new', [ProductController::class, 'new']);
        Route::post("create", [ProductController::class, 'store']);
        Route::delete('delete/{id}', [ProductController::class, 'destroy']);
        Route::put('update/{id}', [ProductController::class, 'update']);
        Route::get("related/{slug}", [ProductController::class, 'related']);
        Route::get('{slug}', [ProductController::class, 'show']);
    }
);


Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'wishlist',
    ],
    function () {
        Route::get('/', [Wishlist::class, 'index']);
        Route::post('toggle', [Wishlist::class, 'toggleWishList']);
        Route::post("/info", [Wishlist::class, 'getWishlistProducts']);
    }
);

Route::group(
    [
        'prefix' => 'locations'
    ],
    function () {
        Route::get('provinces', [LocationController::class, 'provinces']);
        Route::get('districts', [LocationController::class, 'getDistricts']);
        Route::get('wards', [LocationController::class, 'getWards']);
        Route::post('addOrUpdate', [LocationController::class, 'addOrUpdate']);
        Route::delete('delete', [LocationController::class, 'delete']);
        Route::put('set-default', [LocationController::class, 'setDefault']);
        Route::get('getAddresses', [LocationController::class, 'getAddresses']);
        Route::post('shipping-fee', [LocationController::class, 'shippingFee']);
    }
);

Route::group(
    [
        'prefix' => 'categories'
    ],
    function () {
        Route::get('/', [CategoryController::class, 'index']);
    }
);

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'cart'
    ],
    function () {
        Route::get('/', [CartController::class, 'getCart']);
        Route::post('add', [CartController::class, 'addItem']);
        Route::post('update', [CartController::class, 'updateQuantity']);
        Route::post('remove', [CartController::class, 'removeItem']);
        Route::post('clear', [CartController::class, 'clearCart']);
        Route::post('transfer-to-guest', [CartController::class, 'transferCartToGuest']);
        Route::post('merge', [CartController::class, 'mergeCart']);
    }
);

Route::group(
    [
        'prefix' => 'discounts'
    ],
    function () {
        Route::get('/', [DiscountController::class, 'index']); // Lấy danh sách tất cả mã giảm giá
        Route::post('/', [DiscountController::class, 'store']); // Tạo mã giảm giá mới
        Route::get('/{id}', [DiscountController::class, 'show']); // Lấy chi tiết một mã giảm giá
        Route::put('/{id}', [DiscountController::class, 'update']); // Cập nhật mã giảm giá
        Route::delete('/{id}', [DiscountController::class, 'destroy']); // Xóa mã giảm giá
    }
);


Route::group([
        'prefix' => 'uploads'
], function () {
    Route::post('/', [UploadController::class, 'upload']);
});


// Route::group(
//     [
//         'prefix' => 'order-discounts'
//     ],
//     function () {
//         Route::get('/', [OrderDiscountController::class, 'index']); // Lấy danh sách tất cả mã giảm giá
//         Route::post('/', [OrderDiscountController::class, 'store']); // Tạo mã giảm giá mới
//         Route::get('/{order_id}', [OrderDiscountController::class, 'show']); // Lấy chi tiết một mã giảm giá
//         Route::delete('/{id}', [OrderDiscountController::class, 'destroy']); // Xóa mã giảm giá
//     }
// );
// Route::group(
//     [
//         'prefix' => 'product-discounts'
//     ],
//     function () {
//         Route::get('/', [ProductDiscountController::class, 'index']); // Lấy danh sách tất cả mã giảm giá
//         Route::post('/', [ProductDiscountController::class, 'store']); // Tạo mã giảm giá mới
//         Route::get('/{product_id}', [ProductDiscountController::class, 'show']); // Lấy chi tiết một mã giảm giá
//         Route::delete('/{id}', [ProductDiscountController::class, 'destroy']); // Xóa mã giảm giá
//     }
// );


Route::post('/apply-discount', [ApplyDiscountController::class, 'applyDiscount']);

Route::group(
    [
        'prefix' => 'orders'
    ],
    function () {
        Route::get('/', [OrderController::class, 'getOrders']);
        Route::post('/', [OrderController::class, 'checkout']);
        Route::post("/track-order", [OrderController::class, 'trackOrder']);
    }

);

Route::post('/vnpay/paymentReturn', [VnpayController::class, 'paymentReturn']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'users'
], function ($router) {
    Route::get('/user-paginate', [UserController::class, 'getUserPaginate']);
    Route::put('/update/{id}', [UserController::class, 'updateUser']);
    Route::delete('/delete/{id}', [UserController::class, 'deleteUser']);
});

Route::group([
    'prefix' => 'admin'

],function () {
    Route::get('/dashboard', [AdminController::class, 'index']);
    Route::get('/transactions', [AdminController::class, 'getTransaction']);
    Route::put('/update-transaction/{id}', [AdminController::class, 'updateTransaction']);
    Route::delete('/delete-transaction/{id}', [AdminController::class, 'deleteTransaction']);

});
