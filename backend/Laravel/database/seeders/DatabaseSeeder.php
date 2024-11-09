<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            GarageSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            RoleUserSeeder::class,
            BusModelSeeder::class,
            BusSeeder::class,
            BusStationSeeder::class,
            DriverSeeder::class,
            RouteSeeder::class,
            TicketSeeder::class
        ]);
    }
}
