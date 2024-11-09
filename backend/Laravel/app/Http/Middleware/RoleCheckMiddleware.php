<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class RoleCheckMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  ...$roles
     * @return mixed
     */
    public function handle($request, Closure $next, ...$roles)
    {
        try {
            $token = JWTAuth::parseToken();
            $payload = $token->getPayload();
            $userRoles = $payload->get('roles');
            if (!$userRoles || !is_array($userRoles)) {
                return response()->json(['error' => 'Unauthorized, no roles found'], 403);
            }
            $userRoles = array_map('strtolower', $userRoles);
            $requiredRoles = array_map('strtolower', $roles);
            $roleMatch = false;
            foreach ($requiredRoles as $role) {
                if (in_array($role, $userRoles)) {
                    $roleMatch = true;
                    break;
                }
            }
            if (!$roleMatch) {
                return response()->json([
                    'error' => 'Unauthorized, insufficient permissions',
                    'userRoles' => $userRoles,
                    'requiredRoles' => $requiredRoles
                ], 403);
            }

        } catch (JWTException $e) {
            return response()->json(['error' => 'Token not provided or could not parse token'], 401);
        }

        return $next($request);
    }
}
