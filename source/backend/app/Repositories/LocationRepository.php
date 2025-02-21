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

    public function create($request, $userId = null, $guestId = null)
    {
        $data = $request->all();
        $data['user_id'] = $userId;
        $data['guest_id'] = $guestId;
        $userAddress = $this->userAddress->create($data);
        return $userAddress;
    }

    public function delete($idAddress)
    {
        $userAddress = $this->userAddress->find($idAddress);
        $userAddress->delete();
        return $userAddress;
    }

    public function setDefault($userId = null, $guestId = null, $idAddress)
    {
        if ($userId) {
            $userAddress = $this->userAddress->where('user_id', $userId)->get();
        } else {
            $userAddress = $this->userAddress->where('guest_id', $guestId)->get();
        }
        foreach ($userAddress as $address) {
            $address->update(['is_default' => 0]);
        }
        $address = $this->userAddress->find($idAddress);
        $address->update(['is_default' => 1]);
        return $address;
    }

    public function getAddressById(int $addressId)
    {
        return $this->userAddress->find($addressId);
    }
    public function getAddresses($userId = null, $guestId = null)
    {
        $query = $this->userAddress->with(['province', 'district', 'ward']);
        if ($userId) {
            return $query->where('user_id', $userId)->get();
        }
        return $query->where('guest_id', $guestId)->get();
    }
}
