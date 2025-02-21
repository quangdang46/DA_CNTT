<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Tymon\JWTAuth\Facades\JWTAuth;

class UpdateMeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Lấy thông tin người dùng từ JWT token
        $user = JWTAuth::parseToken()->authenticate();

        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id),
            ],
            'phone' => 'required|string|max:15',
            'loyalty_points' => 'required|integer|min:0',
            'password' => 'nullable|string|min:6',
            'password_1' => 'nullable|string|min:6|same:password_2',
            'password_2' => 'nullable|string|min:6|same:password_1',
        ];
    }
}
