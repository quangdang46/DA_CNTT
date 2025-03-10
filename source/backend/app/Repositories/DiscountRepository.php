<?php

namespace App\Repositories;

use App\Models\Discount;
use App\Repositories\Interfaces\DiscountRepositoryInterface;

class DiscountRepository implements DiscountRepositoryInterface
{
    protected $discount;

    public function __construct(Discount $discount)
    {
        $this->discount = $discount;
    }

    public function create(array $data)
    {
        return $this->discount->create($data);
    }

    public function all()
    {
        return $this->discount->all();
    }

    public function find($id)
    {
        return $this->discount->find($id);
    }

    public function update($id, array $data)
    {
        $discount = $this->discount->find($id);
        if ($discount) {
            $discount->update($data);
            return $discount;
        }
        return null;
    }

    public function delete($id)
    {
        $discount = $this->discount->find($id);
        if ($discount) {
            $discount->delete();
            return true;
        }
        return false;
    }
}
