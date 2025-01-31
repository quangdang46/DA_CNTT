<?php

namespace App\Repositories;

use App\Models\District;
use App\Models\Province;
use App\Models\Ward;
use App\Repositories\Interfaces\LocationRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class LocationRepository implements LocationRepositoryInterface
{
    protected $district, $province, $ward;

    public function __construct(District $district, Province $province, Ward $ward) {
        $this->district = $district;
        $this->province = $province;
        $this->ward = $ward;
    }

    public function provinces() {
        return $this->province->all();
    }

    public function getDistricts($provinceId) {
        return $this->district->where('province_code', $provinceId)->get();
    }

    public function getWards($districtId) {
        return $this->ward->where('district_code', $districtId)->get();
    }
}
