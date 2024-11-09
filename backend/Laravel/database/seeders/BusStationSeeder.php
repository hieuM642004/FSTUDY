<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class BusStationSeeder extends Seeder
{
    public function run()
    {
        // Lấy tất cả các garage_id từ bảng garages
        $garageIds = DB::table('garages')->pluck('id')->toArray();

        DB::table('bus_stations')->insert([
            [
                'name' => 'Bến xe Cần Thơ',
                'garage_id' => $garageIds[array_rand($garageIds)], // Lấy ngẫu nhiên garage_id
                'province_id' => 59,
                'address' => 'Số 91B Đường Lê Hồng Phong, Ninh Kiều',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Bến xe An Giang',
                'garage_id' => $garageIds[array_rand($garageIds)], // Lấy ngẫu nhiên garage_id
                'province_id' => 57,
                'address' => 'Số 12 Đường Trần Hưng Đạo, Long Xuyên',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Bến xe Miền Đông',
                'garage_id' => $garageIds[array_rand($garageIds)], // Lấy ngẫu nhiên garage_id
                'province_id' => 50,
                'address' => 'Số 292 Đinh Bộ Lĩnh, Bình Thạnh',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Bến xe Đà Lạt',
                'garage_id' => $garageIds[array_rand($garageIds)], // Lấy ngẫu nhiên garage_id
                'province_id' => 44,
                'address' => 'Số 1 Đường Tô Hiệu, Đà Lạt',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'Bến xe Vĩnh Long',
                'garage_id' => $garageIds[array_rand($garageIds)], // Lấy ngẫu nhiên garage_id
                'province_id' => 55,
                'address' => 'Số 43 Đường Phạm Hùng, Vĩnh Long',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
