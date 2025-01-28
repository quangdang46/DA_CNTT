<?php

namespace App\Repositories;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use Illuminate\Support\Facades\Hash;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function __construct(User $model)
    {
        parent::__construct($model);
    }


    public function updateUser(int $id, array $data)
    {
        $user = $this->model->findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function getUserByEmail(string $email)
    {
        // return User::where('email', $email)->first();
        return $this->model->where('email', $email)->first();
    }

    public function authenticate(string $email, string $password)
    {
        $user = $this->model->where('email', $email)->first();

        if ($user && Hash::check($password, $user->password)) {
            return $user; // Xác thực thành công, trả về thông tin người dùng
        }

        return null; // Xác thực thất bại
    }
    public function createUser(array $data)
    { // Trước khi tạo người dùng mới, bạn cần kiểm tra lại email có trùng không
        $existingUser = $this->getUserByEmail($data['email']);
        if ($existingUser) {
            throw new \Exception("The email has already been taken.");
        }
        $data['password'] = Hash::make($data['password']); // Mã hóa mật khẩu
        return $this->model->create($data);
    }
}
