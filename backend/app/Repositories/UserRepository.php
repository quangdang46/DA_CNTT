<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository implements UserRepositoryInterface
{
    public function getAllUsers()
    {
        return User::all();
    }

    public function getUserById(int $id)
    {
        return User::findOrFail($id);
    }

    public function createUser(array $data)
    {
        $data['password'] = Hash::make($data['password']); // Mã hóa mật khẩu
        return User::create($data);
    }

    public function updateUser(int $id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function deleteUser(int $id)
    {
        return User::destroy($id);
    }

    public function getUserByEmail(string $email)
    {
        return User::where('email', $email)->first();
    }

    public function authenticate(string $email, string $password)
    {
        $user = User::where('email', $email)->first();

        if ($user && Hash::check($password, $user->password)) {
            return $user; // Xác thực thành công, trả về thông tin người dùng
        }

        return null; // Xác thực thất bại
    }

    public function updatePassword(int $id, string $newPassword)
    {
        $user = User::findOrFail($id);
        $user->update(['password' => Hash::make($newPassword)]);
        return $user;
    }

    public function verifyEmail(string $email)
    {
        $user = User::where('email', $email)->first();

        if ($user) {
            $user->email_verified_at = now();
            $user->save();
            return true;
        }

        return false;
    }
}
