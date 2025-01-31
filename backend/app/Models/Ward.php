<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ward extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'name', 'district_code'];


    public function district()
    {
        return $this->belongsTo(District::class, 'district_code', 'code');
    }

    public function addresses()
    {
        return $this->hasMany(UserAddress::class, 'ward_code', 'code');
    }
}
