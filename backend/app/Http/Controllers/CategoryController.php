<?php

namespace App\Http\Controllers;

use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        $categories = $this->categoryService->getAllCategories();
        return response()->json([
            'success' => true,
            'status' => 'success',
            'data' => $categories
        ]);
    }
}
