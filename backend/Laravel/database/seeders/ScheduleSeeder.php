<?php

namespace Database\Seeders;

use App\Models\BusModel;
use App\Models\Route;
use App\Models\Schedule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schedule::create([
            'bus_id' => 1,
            'route_id' => 1,
            'available_seats' => 45,
            'departure_time' => '2024-10-01 06:00:00',
            'arrival_time' => '2024-10-01 10:00:00',
            'ticket_price' => 150000.00, // Set ticket_price here
            'created_at' => \Illuminate\Support\Carbon::now(),
            'updated_at' => \Illuminate\Support\Carbon::now(),
        ]);

    }
}
