<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    public function run()
    {
        $garages = DB::table('garages')->pluck('id')->toArray();

        DB::table('users')->insert([
            ['id' => Str::uuid(), 'name' => 'User 1', 'email' => 'user1@example.com', 'password' => bcrypt('12345678'), 'phone' => '0123456789', 'address' => 'Address 1', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['id' => Str::uuid(), 'name' => 'User 2', 'email' => 'user2@example.com', 'password' => bcrypt('12345678'), 'phone' => '0987654321', 'address' => 'Address 2', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['id' => Str::uuid(), 'name' => 'User 3', 'email' => 'user3@example.com', 'password' => bcrypt('12345678'), 'phone' => '0123987654', 'address' => 'Address 3', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['id' => Str::uuid(), 'name' => 'User 4', 'email' => 'user4@example.com', 'password' => bcrypt('12345678'), 'phone' => '0909090909', 'address' => 'Address 4', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['id' => Str::uuid(), 'name' => 'User 5', 'email' => 'user5@example.com', 'password' => bcrypt('12345678'), 'phone' => '0808080808', 'address' => 'Address 5', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
        ]);
    }
}
