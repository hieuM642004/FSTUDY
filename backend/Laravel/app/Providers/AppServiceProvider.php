<?php

namespace App\Providers;

use App\Repositories\BusRepository;
use App\Repositories\DriverRepository;
use App\Repositories\GarageRepository;
use App\Repositories\Implementations\BusRepositoryInterface;
use App\Repositories\Implementations\DriverRepositoryInterface;
use App\Repositories\Implementations\GarageRepositoryInterface;
use App\Repositories\Implementations\RoleRepositoryInterface;
use App\Repositories\Implementations\UserRepositoryInterface;
use App\Repositories\RoleRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(RoleRepositoryInterface::class, RoleRepository::class);
        $this->app->bind(BusRepositoryInterface::class, BusRepository::class);
        $this->app->bind(GarageRepositoryInterface::class, GarageRepository::class);
        $this->app->bind(DriverRepositoryInterface::class, DriverRepository::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
