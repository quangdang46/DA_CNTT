<?php

namespace App\Repositories;

use App\Models\Wishlist;
use App\Repositories\Interfaces\WishlistRepositoryInterface;

class WishlistRepository extends BaseRepository implements WishlistRepositoryInterface
{
    public function __construct(Wishlist $model)
    {
        parent::__construct($model);
    }

    public function getAll($userId)
    {
        return $this->model->where('user_id', $userId)->pluck('product_id')->toArray();
    }

    public function addOrRemove($userId, $productId)
    {
        $wishlistItem = $this->model->where('user_id', $userId)->where('product_id', $productId)->first();
        if ($wishlistItem) {
            $wishlistItem->delete();
            return 'removed from wishlist';
        }
        $this->model->create([
            'user_id' => $userId,
            'product_id' => $productId
        ]);
        return 'added to wishlist';
    }
}
