<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface
{
    public function updateUser(int $id, array $data);

    public function getUserByEmail(string $email);
    public function authenticate(string $email, string $password);
}
