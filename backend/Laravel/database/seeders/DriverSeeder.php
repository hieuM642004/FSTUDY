<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverSeeder extends Seeder
{
    public function run()
    {
        $garages = DB::table('garages')->pluck('id')->toArray();

        DB::table('drivers')->insert([
            ['name' => 'Driver A', 'phone' => '0123456789', 'email' => 'driverA@example.com', 'role' => 'driver', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['name' => 'Driver B', 'phone' => '0987654321', 'email' => 'driverB@example.com', 'role' => 'driver', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['name' => 'Driver C', 'phone' => '0123987654', 'email' => 'driverC@example.com', 'role' => 'driver', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['name' => 'Driver D', 'phone' => '0909090909', 'email' => 'driverD@example.com', 'role' => 'driver', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['name' => 'Driver E', 'phone' => '0808080808', 'email' => 'driverE@example.com', 'role' => 'driver', 'garage_id' => $garages[array_rand($garages)], 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
        ]);
    }
}
