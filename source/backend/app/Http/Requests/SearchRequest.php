<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
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
        return [
            'name' => 'nullable|string|max:255',
            // 'categories' => 'nullable|array',
            // 'categories.*' => 'numeric|exists:categories,id',
            'minPrice' => 'nullable|numeric|min:0',
            'maxPrice' => 'nullable|numeric|min:0',
            'page' => 'nullable|numeric|min:1', // Đảm bảo page là số và >= 1
            'perPage' => 'nullable|numeric|min:1', // Đảm bảo perPage là số và >= 1
            'sortBy' => 'nullable|string|in:rating,date,price-asc,price-desc', // Đảm bảo sortBy có các giá trị hợp lệ
        ];
    }
}
