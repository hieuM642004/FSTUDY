<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Token;
use Carbon\Carbon;

class TokenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Token::create([
            'access_token' => bin2hex(random_bytes(32)), // Create random access token
            'refresh_token' => bin2hex(random_bytes(32)), // Create random refresh token
            'expires_at' => Carbon::now()->addMinutes(rand(10, 120)), // Set expiration date
        ]);
    }
}
