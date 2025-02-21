<?php

namespace App\Services;

use App\Repositories\Interfaces\UserRepositoryInterface;

/**
 * Class UserService
 * @package App\Services
 */
class UserService
{
    protected $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getUserByEmail($email){
        return $this->userRepository->getUserByEmail($email);
    }

    public function update($id, $data){
        return $this->userRepository->updateUser($id, $data);
    }
}
