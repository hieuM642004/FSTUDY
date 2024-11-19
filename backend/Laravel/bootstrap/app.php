<?php

use App\Http\Middleware\RoleCheckMiddleware;
use App\Http\Middleware\SecretKeyMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        using: function () {
            // Load system routes
            $systemRoutesPath = base_path('routes/system');
            foreach (glob("{$systemRoutesPath}/*.php") as $routeFile) {
                Route::middleware('api')
                     ->prefix('api/system')
                     ->name('system.')
                     ->group($routeFile);
            }

            // Load client routes
            $clientRoutesPath = base_path('routes/client');
            foreach (glob("{$clientRoutesPath}/*.php") as $routeFile) {
                Route::middleware('api')
                     ->prefix('api/client')
                     ->name('client.')
                     ->group($routeFile);
            }
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role.check' => RoleCheckMiddleware::class,
            'secret.key' => SecretKeyMiddleware::class,
            'check.zalo.token' => \App\Http\Middleware\EnsureZaloAccessTokenValid::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Xử lý ngoại lệ AuthenticationException
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            return response()->json([
                'message' => 'Unauthorized access: ' . $e->getMessage(),
            ], 401);
        });

        // Xử lý các ngoại lệ khác
        $exceptions->render(function (\Exception $e, Request $request) {
            return response()->json([
                'message' => 'An error occurred: ' . $e->getMessage(),
            ], 500);
        });
    })->create();
