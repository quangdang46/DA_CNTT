<?php

namespace App\Providers;

use App\Models\Category;
use App\Repositories\CategoryRepository;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Repositories\Interfaces\LocationRepositoryInterface;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\Interfaces\WishlistRepositoryInterface;
use App\Repositories\LocationRepository;
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
        CategoryRepositoryInterface::class => CategoryRepository::class

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
