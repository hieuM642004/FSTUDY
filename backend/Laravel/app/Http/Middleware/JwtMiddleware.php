<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\UserNotDefinedException;

class JwtMiddleware
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
        try {
            // Xác thực token và lấy thông tin user
            $user = JWTAuth::parseToken()->authenticate();
            $garage_id = $user->garage_id;
            $request->merge(['garage_id' => $garage_id]);

        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token has expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token is invalid'], 401);
        } catch (TokenBlacklistedException $e) {
            return response()->json(['error' => 'Token is blacklisted'], 401);
        } catch (UserNotDefinedException $e) {
            return response()->json(['error' => 'User not found'], 404);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token not provided or could not parse token'], 401);
        }

        return $next($request);
    }
}
