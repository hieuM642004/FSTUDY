<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\System\BusController;

Route::prefix('/zalo')->name('zalo.')
    ->group(function () {
       
        Route::post('/send-sms', [BusController::class, 'sendSms']);
        Route::post('/send-zalo-message', [BusController::class, 'sendZaloMessage']);
        Route::get('/send-active/{key}', [BusController::class, 'SendActiveKey']);
        Route::post('/send-zalo', [BusController::class, 'sendMessage']);
        Route::post('/send-zalo-template-message', [BusController::class, 'sendTemplateMessage']);
        Route::post('/zalo/send-message', [BusController::class, 'sendMessageText']);

    });
