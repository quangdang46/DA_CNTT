<?php

namespace App\Repositories\Interfaces;

interface LocationRepositoryInterface
{
    public function provinces();
    public function getDistricts($provinceId);
    public function getWards($districtId);
    public function update($request, $id);
    public function create($request, $userId, $guestId);
    public function delete($idAddress);
    public function setDefault($userId, $guestId, $idAddress);
    public function getAddresses($userId, $guestId);
}
