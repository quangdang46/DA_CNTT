<?php

namespace App\Providers;

use App\Repositories\CartRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\Interfaces\CartRepositoryInterface;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Repositories\Interfaces\DiscountRepositoryInterface;
use App\Repositories\Interfaces\LocationRepositoryInterface;
use App\Repositories\Interfaces\OrderDiscountRepositoryInterface;
use App\Repositories\Interfaces\OrderRepositoryInterface;
use App\Repositories\Interfaces\PaymentRepositoryInterface;
use App\Repositories\Interfaces\ProductDiscountRepositoryInterface;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\Interfaces\WishlistRepositoryInterface;
use App\Repositories\LocationRepository;
use App\Repositories\OrderDiscountRepository;
use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;
use App\Repositories\ProductDiscountRepository;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;
use App\Repositories\WishlistRepository;
use App\Services\GHTKService;
use App\Services\VNPayService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public $serviceBindings = [
        UserRepositoryInterface::class => UserRepository::class,
        ProductRepositoryInterface::class => ProductRepository::class,
        WishlistRepositoryInterface::class => WishlistRepository::class,
        LocationRepositoryInterface::class => LocationRepository::class,
        CategoryRepositoryInterface::class => CategoryRepository::class,
        CartRepositoryInterface::class => CartRepository::class,
        DiscountRepositoryInterface::class => DiscountRepository::class,
        OrderDiscountRepositoryInterface::class => OrderDiscountRepository::class,
        ProductDiscountRepositoryInterface::class => ProductDiscountRepository::class,
        OrderRepositoryInterface::class => OrderRepository::class,
        PaymentRepositoryInterface::class => PaymentRepository::class

    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        foreach ($this->serviceBindings as $key => $val) {
            $this->app->bind($key, $val);
        }
        // Đăng ký GHTKService
        $this->app->singleton(GHTKService::class, function ($app) {
            return new GHTKService();
        });
        $this->app->singleton(VNPayService::class, function ($app) {
            return new VNPayService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
