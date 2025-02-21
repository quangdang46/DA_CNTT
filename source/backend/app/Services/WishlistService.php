<?php

namespace App\Services;

use App\Repositories\Interfaces\WishlistRepositoryInterface;

/**
 * Class UserService
 * @package App\Services
 */
class WishlistService
{
    protected $wishListRepository;

    public function __construct(WishlistRepositoryInterface $wishListRepository)
    {
        $this->wishListRepository = $wishListRepository;
    }

    public function getAllWishList($userId)
    {
        return $this->wishListRepository->getAll($userId);
    }

    public function toggleWishList($userId, $productId)
    {
        return $this->wishListRepository->addOrRemove($userId, $productId);
    }
}
