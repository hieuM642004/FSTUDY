<?php

namespace Database\Seeders;

use App\Models\BusModel;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $garages = DB::table('garages')->pluck('id')->toArray();
        $models = DB::table('bus_models')->pluck('id')->toArray();
        $buses = [];

        for ($i = 1; $i <= 5; $i++) {
            $buses[] = [
                'garage_id' => $garages[array_rand($garages)], // Select a random user ID
                'bus_number' => 'BUS00' . $i,
                'model_id' => $models[array_rand($models)], // Select a random model ID
                'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),
            ];
        }

        DB::table('buses')->insert($buses);
    }
}
