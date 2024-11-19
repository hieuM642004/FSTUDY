<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\ZaloTokenService;
use Illuminate\Support\Facades\Log;
class EnsureZaloAccessTokenValid
{
    protected $zaloTokenService;

    public function __construct(ZaloTokenService $zaloTokenService)
    {
        $this->zaloTokenService = $zaloTokenService;
    }

    public function handle($request, Closure $next)
    {
        try {
            $accessToken = $this->zaloTokenService->getValidAccessToken();
    
            if (!$accessToken) {
                return response()->json(['error' => 'Không thể lấy access token.'], 401);
            }
    
            $request->headers->set('X-Access-Token', $accessToken);
        } catch (\Exception $e) {
            Log::error('Middleware Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    
        return $next($request);
    }
    
    
}
