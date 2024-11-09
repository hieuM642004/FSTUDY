<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Example of adding booked seats if needed
//        DB::table('booked_seats')->insert([
//            [
//                'route_id' => 1, // Replace with an actual route ID
//                'seat_number' => 1,
//                'date' => now()->toDateString(),
//                'created_at' => now(),
//                'updated_at' => now(),
//            ],
//            [
//                'route_id' => 1, // Replace with an actual route ID
//                'seat_number' => 2,
//                'date' => now()->toDateString(),
//                'created_at' => now(),
//                'updated_at' => now(),
//            ],
//            // Add more as necessary
//        ]);
    }
}
