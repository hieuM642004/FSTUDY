<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\System\BusController;

Route::prefix('/zalo')->name('zalo.')
    ->group(function () {
        Route::post('/send-zalo-template-message', [BusController::class, 'sendTemplateMessage']);

    });
