<?php

namespace App\Repositories\Interfaces;

interface LocationRepositoryInterface
{
    public function provinces();
    public function getDistricts($provinceId);
    public function getWards($districtId);

}
