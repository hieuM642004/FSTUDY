<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\System\BusController;

Route::middleware(['check.zalo.token'])->group(function () {
    Route::post('/zalo/send-zalo-template-message', [BusController::class, 'sendTemplateMessage']);
});
