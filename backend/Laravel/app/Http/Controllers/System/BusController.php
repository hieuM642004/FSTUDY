<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Http\Requests\System\Bus\StoreBusRequest;
use App\Http\Requests\System\Bus\UpdateBusRequest;
use App\Repositories\Implementations\BusRepositoryInterface;
use App\Http\Resources\System\Bus\BusListResource;
use App\Services\ResponseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
class BusController extends Controller
{
    protected $busRepository;

   

    public function sendSms(Request $request)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
        ])->post('https://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_post_json/', [
            'ApiKey' => $request->input('ApiKey'),
            'Content' => $request->input('Content'),
            'Phone' => $request->input('Phone'),
            'SecretKey' => $request->input('SecretKey'),
            'Brandname' => $request->input('Brandname'),
            'SmsType' => '2',
            'IsUnicode' => $request->input('IsUnicode'),
            'Sandbox' => $request->input('Sandbox'),
            'campaignid' => $request->input('campaignid'),
            'RequestId' => $request->input('RequestId'),
            'CallbackUrl' => $request->input('CallbackUrl'),
            'SendDate' => $request->input('SendDate'),
        ]);

        return response()->json([
            'status' => $response->successful(),
            'data' => $response->json(),
        ]);
    }
    public function sendZaloMessage(Request $request)
    {
        // All data is taken directly from the request body
        $response = Http::timeout(15) // set timeout in seconds
        ->withHeaders([
            'Content-Type' => 'application/json',
        ])
            ->post('https://rest.esms.vn/MainService.svc/json/SendZaloMessage_V6/', [
                'ApiKey' => $request->input('ApiKey'),
                'SecretKey' => $request->input('SecretKey'),
                'OAID' => $request->input('OAID'),
                'Phone' => $request->input('Phone'),
                'TempData' => $request->input('TempData'),
                'TempID' => $request->input('TempID'),
                'campaignid' => $request->input('campaignid'),
                'RequestId' => $request->input('RequestId'),
                'CallbackUrl' => $request->input('CallbackUrl'),
            ]);


        return response()->json([
            'status' => $response->successful(),
            'data' => $response->json(),
        ]);
    }

    public function SendActiveKey($key){
        $basic  = new \Vonage\Client\Credentials\Basic("abaeda06", "yyPGRJxE0Bzea11j");
        $client = new \Vonage\Client($basic);
        $messageContent = "Mã kích hoạt khóa học là " . $key;

        $response = $client->sms()->send(
            new \Vonage\SMS\Message\SMS("84769628651", 'FSTUDY', $messageContent)
        );

        $message = $response->current();

        if ($message->getStatus() == 0) {
            echo "The message was sent successfully\n";
        } else {
            echo "The message failed with status: " . $message->getStatus() . "\n";
        }


//
//        $response = Http::withBasicAuth('abaeda06', 'yyPGRJxE0Bzea11j')
//            ->withHeaders([
//                'Content-Type' => 'application/json',
//                'Accept' => 'application/json',
//            ])
//            ->post('https://messages-sandbox.nexmo.com/v1/messages', [
//                'from' => '100614398987044',
//                'to' => '9072910729438632',
//                'message_type' => 'text',
//                'text' => 'This is a Facebook Messenger Message sent from the Messages API',
//                'channel' => 'messenger',
//            ]);
//
//// Kiểm tra phản hồi
//        if ($response->successful()) {
//            echo 'Message sent successfully!';
//        } else {
//            echo 'Failed to send message: ' . $response->body();
//        }
    }

    public function sendMessage(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'user_id' => 'required|string',
            'message_text' => 'required|string',
        ]);

        $url = "https://openapi.zalo.me/v3.0/oa/message/cs";
        $accessToken = "MCdKQXrY8tfLnDXe6celUbBDsMWNV6yU7jFNS245Ms8SulSXAIS0KGQ8yH4WVtiEBeU9O3jDEIiVduvlKsX_VXsRsoWlT2auPeYeIpTVAmj_ZgCPSaOGLa6RYWDKVWz-6wo_Q010IoqEbyXY9p5V4JtBq4Ol5NW76_FK5oiFL0O5_SnlDp1O47lMomvO0KP1IkxF8KCbMdnEp-u3H1uQRdNredX-N58OLgIWMcXP9mWjWRDb5ISN4XlxhKOiAJrIECw9F78E3YfqvVbuP2q9AaxwZdy22m8ECjUQQdeV6JmthRfqF4OlP3QRt2S4T6Te6wQJ3LSC4nj7eU9k2MPCBXIItbyZLMeG0BZDV1fuUMy2XTeoF7LP8dEwotnDNN1ZOfI31KPb9s1qav1rMZi606dKYrDZBGuZV9_29n1u97y"; // Replace with your actual Zalo access token

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'access_token' => $accessToken,
        ])->post($url, [
            'recipient' => [
                'user_id' => $validated['user_id'],
            ],
            'message' => [
                'text' => $validated['message_text'],
            ],
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

    public function sendTemplateMessage(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'phone' => 'required|string',
            'template_id' => 'required|string',
            'template_data' => 'required|array',
            'tracking_id' => 'nullable|string',
        ]);
        $accessToken = config('services.zalo.access_token');
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

        dd($response);
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


    public function sendMessageText(Request $request)
    {
        // Set up the required data
        $accessToken = 'snL4Ez3g-4lM64Wvr-BqIz4HIJdQzEr8X18SLuEMtYVq26SLeRRNPk8-75IXdlvrmne-NQAEpchZ86fXwBFJ4kmv5Js4cDaWWmfbCuYKc2RFPY03gk_T2ifxF0gDx_mLq6CuVz36v4k4G5jFXkQ8Rz9tIqMHYQupaN1BGk_O-ZIFNZK5wFJwThy7DrRxcCHxhs4ASicTxqIo00rPuehEKxCl5alvaQbKiJTgPlM5aWonUrq1k-Ax3CXOM16vou8tqKDCBx7cyYAoP2aTufpFQh4RVnZ1ewzen5rtTSFrls2hJdrawER0UxnNBc-y-SfBma8qQBhJs7d0Bp9FgDNKJzH9S6lGrR1LXd5hAkBEr1MoDIibiQoFJ-uuN4-AXQnd_IPI4kAYZp-_F4myle2DI-u3G3fCMZBBYKVTyFzE'; // replace with your actual access token
        $userId = $request->input('user_id'); // e.g., '2512523625412515'
        $text = $request->input('text'); // e.g., 'hello, world!'

        // Define the URL and headers
        $url = 'https://openapi.zalo.me/v3.0/oa/message/cs';
        $headers = [
            'Content-Type' => 'application/json',
            'access_token' => $accessToken,
        ];

        // Define the request body
        $body = [
            'recipient' => [
                'user_id' => $userId,
            ],
            'message' => [
                'text' => $text,
            ],
        ];

        // Send the POST request to Zalo API
        $response = Http::withHeaders($headers)->post($url, $body);

        // Handle the response
        if ($response->successful()) {
            return response()->json(['success' => true, 'response' => $response->json()]);
        } else {
            return response()->json(['success' => false, 'error' => $response->json()], $response->status());
        }
    }
}
