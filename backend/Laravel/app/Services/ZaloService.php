<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class ZaloService
{

    public function refreshAccessToken($refreshToken)
    {
        dd('hello');

        $url = 'https://oauth.zaloapp.com/v4/oa/access_token';
        $response = Http::asForm()->post($url, [
            'app_id' => "2294574995315548459",
            'secret_key' => "vVBJ26WYRi15SunY2inK",
            'refresh_token' => "PtHs4r0hb6TgUNeHLoEOPsrmUn5QDUqKEYTZ148zmm1v4tPpBIwCGnKt5KneAeT9K7O0V2XPxqX3LLnkFmtWPtKsQ6uS6yb3IqbEDY5xsWz4Q3yf6cowEI1VDpvzHeCI7Hai1c0nc2S_OWijU7dgCIzrT1LnA_O7F1PN1NeMwd4H7rm2R1_jDGK2S3jENV4V1NnW7pDvvoj8U48z3KBA9qz5SmSsTDKfRdGp2p9Ego1CRZaRB4oe6cbp3Xe2Lu4hJse9MnvuiIj1IpKC64QW6r1_7Gu_VFD-KsvGR0yzyM5dEHTlNXgXLWCV3Y5LCR8G4H4C7tHEzYqANHPVS0IJPImz31zODuuOFoyo8W0EWLPTKI0a90oUB4PL1IG12EjAQmv-MYeSv51s8NHT0HdvHbKX6a8EQzT3NJ6JOW",
            'grant_type' => 'refresh_token',
        ]);

        if ($response->successful()) {
            $data = $response->json();
            Cache::put('zalo_access_token', $data['access_token'], now()->addSeconds($data['expires_in']));
            Cache::put('zalo_refresh_token', $data['refresh_token'], now()->addMonths(3));
            return $data['access_token'];
        }

        throw new \Exception("Không thể làm mới access token: " . $response->body());
    }

    // Hàm để lấy Access Token hiện tại
    public function getAccessToken()
    {
        if (!Cache::has('zalo_access_token')) {
            $refreshToken = Cache::get('zalo_refresh_token');
            if ($refreshToken) {
                return $this->refreshAccessToken($refreshToken);
            } else {
                throw new \Exception("Không tìm thấy refresh token hợp lệ.");
            }
        }

        return Cache::get('zalo_access_token');
    }
}
