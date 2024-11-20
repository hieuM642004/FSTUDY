<?php

namespace App\Services;

use App\Models\Token;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
class ZaloTokenService
{
    public function getValidAccessToken()
    {
        $token = Token::latest('created_at')->first();
        $expiresAt = $token->expires_at;  
        $expiresAt = Carbon::parse($expiresAt); 
        if (!$token || $expiresAt->isPast()) {
            try {
                return $this->refreshAccessToken($token);
            } catch (\Exception $e) {
                Log::error('Error refreshing token: ' . $e->getMessage());
                throw new \Exception('Không thể lấy Access Token mới.');
            }
        }

        return $token->access_token;
    }

    public function refreshAccessToken($token)
    {
        if (!$token || !$token->refresh_token) {
            Log::error('Không tìm thấy Refresh Token hoặc Token không tồn tại.');
            throw new \Exception('Không tìm thấy Refresh Token.');
        }

        $response = Http::asForm()->withHeaders([
            'secret_key' => config('services.zalo.secret_key'),
        ])->post('https://oauth.zaloapp.com/v4/oa/access_token', [
            'refresh_token' => $token->refresh_token,
            'app_id' => config('services.zalo.app_id'),
            'grant_type' => 'refresh_token',
        ]);

        Log::info('API Response: ' . $response->body());

        if ($response->successful()) {
            $data = $response->json();

            if (!isset($data['access_token'])) {
                Log::error('Phản hồi không chứa Access Token.');
                throw new \Exception('Phản hồi không chứa Access Token.');
            }

            $token->update([
                'access_token' => $data['access_token'],
                'refresh_token' => $data['refresh_token'] ?? $token->refresh_token,
                'expires_at' => now()->addSeconds((int) $data['expires_in']),
            ]);

            return $data['access_token'];
        } else {
            Log::error('Zalo API Error: ' . $response->body());
            throw new \Exception('Không thể làm mới Access Token: ' . $response->body());
        }
    }
}
