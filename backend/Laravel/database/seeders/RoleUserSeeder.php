<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userIds = DB::table('users')->pluck('id')->toArray();
        $roleIds = DB::table('roles')->pluck('id')->toArray();
        if (empty($userIds) || empty($roleIds)) {
            return;
        }

        $roleUserAssociations = [];
        for ($i = 0; $i < 5; $i++) {
            $roleUserAssociations[] = [
                'user_id' => $userIds[array_rand($userIds)],
                'role_id' => $roleIds[array_rand($roleIds)],
                'created_at' => \Illuminate\Support\Carbon::now(),
                'updated_at' => \Illuminate\Support\Carbon::now(),
            ];
        }
        DB::table('role_users')->insert($roleUserAssociations);
    }
}
