<?php

namespace App\Providers;

use App\Models\Product;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public $serviceBindings = [
        UserRepositoryInterface::class => UserRepository::class,
        ProductRepositoryInterface::class => ProductRepository::class,

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
