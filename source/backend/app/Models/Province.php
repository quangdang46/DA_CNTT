<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
    ];


    public function districts()
    {
        return $this->hasMany(District::class, 'province_code', 'code');
    }
    public function addresses()
    {
        return $this->hasMany(UserAddress::class, 'province_code', 'code');
    }
}
