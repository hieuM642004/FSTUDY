<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
class BusController extends Controller
{
    protected $busRepository;

   

   
    public function sendTemplateMessage(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'phone' => 'required|string',
            'template_id' => 'required|string',
            'template_data' => 'required|array',
            'tracking_id' => 'nullable|string',
        ]);

        // Lấy access token từ header của request
        $accessToken = $request->header('X-Access-Token');
        if (!$accessToken) {
            return response()->json([
                'status' => 'error',
                'message' => 'Access token không tồn tại hoặc không hợp lệ.',
            ], 401);
        }
    
        $url = "https://business.openapi.zalo.me/message/template";
    
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'access_token' => $accessToken,
        ])->post($url, [
            'phone' => $validated['phone'],
            'template_id' => $validated['template_id'],
            'template_data' => $validated['template_data'],
            'tracking_id' => $validated['tracking_id'] ?? null,
        ]);
    
        if ($response->successful()) {
            return response()->json([
                'status' => 'success',
                'data' => $response->json(),
            ]);
        } else {
            // Return error response
            return response()->json([
                'status' => 'error',
                'message' => $response->body(),
            ], $response->status());
        }
    }
    


    
}
