<?php

namespace App\Http\Middleware;

use Closure;

class SecretKeyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $secretKey = config('app.secret_key');  // Thay 'app.secret_key' theo cấu hình của bạn
        if ($request->header('secretkey') !== $secretKey) {
            return response()->json(['error' => 'Unauthorized, invalid or missing secret key'], 403);
        }
        return $next($request);
    }
}
