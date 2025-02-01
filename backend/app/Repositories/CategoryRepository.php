<?php

namespace App\Repositories;

use App\Models\Category;
use App\Models\District;
use App\Models\Province;
use App\Models\UserAddress;
use App\Models\Ward;
use App\Repositories\Interfaces\CategoryRepositoryInterface;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }

    public function getAll()
    {
        return $this->model->all();
    }
}
