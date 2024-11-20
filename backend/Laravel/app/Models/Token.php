<?php
namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Carbon\Carbon;

class Token extends Model
{
    protected $connection = 'mongodb'; // Sử dụng MongoDB
    protected $collection = 'tokens'; // Tên collection trong MongoDB

    protected $fillable = [
        'access_token',
        'refresh_token',
        'expires_at',
    ];

    // Đảm bảo lưu expires_at dưới dạng chuỗi
    public function setExpiresAtAttribute($value)
    {
        $this->attributes['expires_at'] = Carbon::parse($value)->format('Y-m-d H:i:s');
    }

    protected $dates = ['expires_at'];
}

