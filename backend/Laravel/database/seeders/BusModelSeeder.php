<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $models = [
            ['name' => 'Xe giường nằm', 'capacity' => 50,
             'created_at' => \Illuminate\Support\Carbon::now(),
             'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['name' => 'Xe Limmousin', 'capacity' => 40,
              'created_at' => \Illuminate\Support\Carbon::now(),
              'updated_at' => \Illuminate\Support\Carbon::now(),],
            ['name' => 'Xe ghế ngồi', 'capacity' => 30,
             'created_at' => \Illuminate\Support\Carbon::now(),
             'updated_at' => \Illuminate\Support\Carbon::now(),],

        ];

        DB::table('bus_models')->insert($models);
    }
}
