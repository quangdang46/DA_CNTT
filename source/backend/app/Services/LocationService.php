<?php

namespace App\Services;

use App\Repositories\Interfaces\LocationRepositoryInterface;

class LocationService
{
    protected $locationRepository;

    public function __construct(LocationRepositoryInterface $locationRepository)
    {
        $this->locationRepository = $locationRepository;
    }

    public function provinces()
    {
        return $this->locationRepository->provinces();
    }


    public function getDistricts($provinceId)
    {
        return $this->locationRepository->getDistricts($provinceId);
    }

    public function getWards($districtId)
    {
        return $this->locationRepository->getWards($districtId);
    }

    public function addOrUpdate($request, $userId, $guestId)
    {
        $id = $request->id;
        if ($id) {
            return $this->locationRepository->update($request, $id);
        }
        // return $this->locationRepository->create($request, $userId);
        if ($userId) {
            return $this->locationRepository->create($request, $userId, null);
        }
        return $this->locationRepository->create($request, null, $guestId);
    }

    public function delete($idAddress, $userId, $guestId)
    {
        return $this->locationRepository->delete($idAddress, $userId, $guestId);
    }

    public function setDefault($userId, $guestId, $idAddress)
    {
        return $this->locationRepository->setDefault($userId, $guestId, $idAddress);
    }

    public function getAddresses($userId, $guestId)
    {
        return $this->locationRepository->getAddresses($userId, $guestId);
    }
}
