<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RouteSeeder extends Seeder
{
    public function run()
    {
        // Giả định rằng bảng 'bus_stations', 'buses' và 'drivers' đã có dữ liệu
        $stations = DB::table('bus_stations')->pluck('id')->toArray();
        $buses = DB::table('buses')->pluck('id')->toArray();
        $drivers = DB::table('drivers')->pluck('id')->toArray();

        DB::table('routes')->insert([
            [
                'departure_station_id' => $stations[array_rand($stations)],
                'arrival_station_id' => $stations[array_rand($stations)],
                'garage_id' => 1,
                'departure_time' => '08:00:00',
                'arrival_time' => '12:00:00',
                'ticket_price' => 100000.00,
                'bus_id' => $buses[array_rand($buses)],
                'driver_id' => $drivers[array_rand($drivers)],
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'departure_station_id' => $stations[array_rand($stations)],
                'arrival_station_id' => $stations[array_rand($stations)],
                'garage_id' => 1,
                'departure_time' => '09:00:00',
                'arrival_time' => '13:00:00',
                'ticket_price' => 120000.00,
                'bus_id' => $buses[array_rand($buses)],
                'driver_id' => $drivers[array_rand($drivers)],
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'departure_station_id' => $stations[array_rand($stations)],
                'arrival_station_id' => $stations[array_rand($stations)],
                'garage_id' => 1,
                'departure_time' => '10:00:00',
                'arrival_time' => '14:00:00',
                'ticket_price' => 150000.00,
                'bus_id' => $buses[array_rand($buses)],
                'driver_id' => $drivers[array_rand($drivers)],
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
