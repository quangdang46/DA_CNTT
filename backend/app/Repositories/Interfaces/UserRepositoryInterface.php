<?php

namespace App\Repositories\Interfaces;

interface UserRepositoryInterface
{
    /**
     * Lấy tất cả người dùng.
     *
     * @return mixed
     */
    public function getAllUsers();

    /**
     * Lấy thông tin người dùng theo ID.
     *
     * @param int $id
     * @return mixed
     */
    public function getUserById(int $id);

    /**
     * Tạo mới người dùng.
     *
     * @param array $data
     * @return mixed
     */
    public function createUser(array $data);

    /**
     * Cập nhật thông tin người dùng.
     *
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function updateUser(int $id, array $data);

    /**
     * Xóa người dùng.
     *
     * @param int $id
     * @return bool
     */
    public function deleteUser(int $id);

    /**
     * Lấy thông tin người dùng qua email (cho xác thực).
     *
     * @param string $email
     * @return mixed
     */
    public function getUserByEmail(string $email);

    /**
     * Kiểm tra thông tin xác thực (login).
     *
     * @param string $email
     * @param string $password
     * @return mixed
     */
    public function authenticate(string $email, string $password);

    /**
     * Cập nhật mật khẩu cho người dùng.
     *
     * @param int $id
     * @param string $newPassword
     * @return mixed
     */
    public function updatePassword(int $id, string $newPassword);

    /**
     * Xử lý xác minh tài khoản qua email (email verification).
     *
     * @param string $email
     * @return bool
     */
    public function verifyEmail(string $email);
}
