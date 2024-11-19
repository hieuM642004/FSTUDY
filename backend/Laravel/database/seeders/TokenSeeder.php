<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Token;

class TokenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Token::create([
            'access_token' => 'KGFrMCBt-3TS3lbQnV_qDri7-5h8wQXKEqBrDURIl5iMKEL7rEEwQX5WndRYseb44bJeU-lrjaGvGEHcuDUB2o94odxxqvXAENUJGzc0yar55wLle8JrOcqTl6-aZkj-JtYtT8cArqLb0wf8Yf7_G7LadNxkmlz30aIGRld8m5LWJP9u-CV6SNzght-YtSvTGYcELgVPsLzbN8bnaDZS67ikaGBctj4L3Mky2_Z3x1SJPOiVWPoUAteTmZAWYeaPF2dBTFcVcdbgC-5NcfdfIseMeYInfkupRZUE9AEwvp58ERO-iy3bNdrJacw8vSPcIbQ6OO74x6CPQxb9mUNnNGbWZ47osF4jBrFmGCx_kaay2z53-vlGA0GPiIVfaz4n4p6Y9kQhrpS3AeXMuRd4OWKRgGggm3XOp-t_CW',
            'refresh_token' => '0aUH5wY6Oa4FIfqLhuvkGGX3d1MYc3KIG06P8BgPDXXe1OerbweJ3KeqWmI6ZXGSPadgFh74Nmnk0lOLaCL8GqfnxL6FpbzyUmF8QgMEIqXZBziHlAzx1cmNq2AtiN1tHmdG9Q28VXvc3VKJhuXz7Nr8Zr69ZI1aO2gWO9gkEMPbAOfpefOc85KBbZUBl1W1GWJiFv2ZMojoCCiOilrq7sDPonsTvsuxM2VCCQEbHcD-QRXIWQWAMtynXMcTXZ1PRHg0KepQ85vb7xnmlvfNHduUs4IyitnmQI6BJigW7aS61hnIy9Or1WTHd2ptuWef2IUdBlMcAG5I8gnMZ9K5OLm4XbgVeGzUNZsh2uQiAWX_E8KgmU0F4W5Dy3_0W4Kh04R50Eh1K5OhOQ12qiK-KpYJzSPXfPnbH0',
        ]);
    }
}
