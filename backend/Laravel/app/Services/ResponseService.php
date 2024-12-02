<?php


namespace App\Services;

class ResponseService
{
    public static function customResponse($data = null, $message = 'Success', $code = 200)
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
