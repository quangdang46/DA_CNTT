<?php

namespace App\Repositories;

use App\Models\District;
use App\Models\Province;
use App\Models\UserAddress;
use App\Models\Ward;
use App\Repositories\Interfaces\LocationRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class LocationRepository implements LocationRepositoryInterface
{
    protected $district, $province, $ward, $userAddress;

    public function __construct(UserAddress $userAddress, District $district, Province $province, Ward $ward)
    {
        $this->userAddress = $userAddress;
        $this->district = $district;
        $this->province = $province;
        $this->ward = $ward;
    }

    public function provinces()
    {
        return $this->province->all();
    }

    public function getDistricts($provinceId)
    {
        return $this->district->where('province_code', $provinceId)->get();
    }

    public function getWards($districtId)
    {
        return $this->ward->where('district_code', $districtId)->get();
    }

    public function update($request, $id)
    {
        $data = $request->all();
        $userAddress = $this->userAddress->find($id);
        $userAddress->update($data);
        return $userAddress;
    }

    public function create($request, $userId)
    {
        $data = $request->all();
        $data['user_id'] = $userId;
        $userAddress = $this->userAddress->create($data);
        return $userAddress;
    }

    public function delete($idAddress)
    {
        $userAddress = $this->userAddress->find($idAddress);
        $userAddress->delete();
        return $userAddress;
    }
}
