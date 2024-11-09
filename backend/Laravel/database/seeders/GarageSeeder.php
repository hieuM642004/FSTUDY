<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GarageSeeder extends Seeder
{
    public function run()
    {
        DB::table('garages')->insert([
            // Nhà xe ở Cần Thơ
            ['name' => 'Nhà xe Phương Trang', 'tax_code' => '0311234567', 'address' => 'Số 91B Đường Lê Hồng Phong, Ninh Kiều, Cần Thơ', 'phone' => '1900 6067', 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],

            // Nhà xe ở An Giang
            ['name' => 'Nhà xe Quốc Bảo', 'tax_code' => '0312345678', 'address' => 'Số 12 Đường Trần Hưng Đạo, Long Xuyên, An Giang', 'phone' => '0296 3852 053', 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],

            // Nhà xe ở TP. Hồ Chí Minh
            ['name' => 'Nhà xe Minh Tuấn', 'tax_code' => '0313456789', 'address' => '292 Đinh Bộ Lĩnh, Bình Thạnh, TP. Hồ Chí Minh', 'phone' => '028 3899 7777', 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],

            // Nhà xe ở Đà Lạt
            ['name' => 'Nhà xe Thắng Lợi', 'tax_code' => '0314567890', 'address' => 'Số 1 Đường Tô Hiệu, Đà Lạt', 'phone' => '063 3550 666', 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],

            // Nhà xe ở Vĩnh Long
            ['name' => 'Nhà xe Vĩnh Long', 'tax_code' => '0315678901', 'address' => 'Số 43 Đường Phạm Hùng, Vĩnh Long', 'phone' => '0270 3845 282', 'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),],
        ]);
    }
}
