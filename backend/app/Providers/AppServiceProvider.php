<?php

namespace App\Providers;

use App\Http\Controllers\ApplyDiscountController;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Repositories\CartRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\Interfaces\CartRepositoryInterface;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Repositories\Interfaces\DiscountRepositoryInterface;
use App\Repositories\Interfaces\LocationRepositoryInterface;
use App\Repositories\Interfaces\OrderDiscountRepositoryInterface;
use App\Repositories\Interfaces\ProductDiscountRepositoryInterface;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\Interfaces\WishlistRepositoryInterface;
use App\Repositories\LocationRepository;
use App\Repositories\OrderDiscountRepository;
use App\Repositories\ProductDiscountRepository;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;
use App\Repositories\WishlistRepository;
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

    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        // $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        //
        foreach ($this->serviceBindings as $key => $val) {
            $this->app->bind($key, $val);
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
