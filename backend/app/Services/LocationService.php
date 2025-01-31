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

    public function addOrUpdate($request, $userId)
    {
        $id = $request->id;
        if ($id) {
            return $this->locationRepository->update($request, $id);
        }
        return $this->locationRepository->create($request, $userId);
    }

    public function delete($idAddress)
    {
        return $this->locationRepository->delete($idAddress);
    }

    public function setDefault($userId, $idAddress)
    {
        return $this->locationRepository->setDefault($userId, $idAddress);
    }
}
