<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TicketSeeder extends Seeder
{
    public function run()
    {
//        // Retrieve all route IDs
//        $routes = DB::table('routes')->pluck('id')->toArray();
//
//        // Ensure there are routes available
//        if (empty($routes)) {
//            return; // Exit if no routes are found
//        }
//
//        // Insert sample tickets using random route IDs
//        for ($i = 0; $i < 5; $i++) { // Create 5 tickets for demonstration
//            $routeId = $routes[array_rand($routes)];
//            $ticketData = [
//                'route_id' => $routeId,
//                'full_name' => 'User ' . $i,
//                'phone_number' => '0909' . rand(100000, 999999),
//                'email' => 'user' . $i . '@example.com',
//                'pickup_point' => 'Pickup Point ' . $i,
//                'dropoff_point' => 'Dropoff Point ' . $i,
//                'price_paid' => 100000.00 + ($i * 10000), // Incremental pricing
//                'date' => now()->toDateString(),
//                'created_at' => now(),
//                'updated_at' => now(),
//            ];
//
//            // Create the ticket
//            $ticketId = DB::table('tickets')->insertGetId($ticketData);
//
//            // Randomly assign seat numbers (for demo purposes)
//            $seatNumbers = range(1, 5); // Available seat numbers (1-5)
//            foreach ($seatNumbers as $seat_number) {
//                DB::table('ticket_seats')->insert([
//                    'ticket_id' => $ticketId,
//                    'seat_number' => $seat_number,
//                ]);
//            }
//        }
    }
}

