<?php

namespace App\Http\Controllers;

use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 15);

        $products = $this->productService->getAllProducts($perPage);

        // Trả về danh sách sản phẩm (có thể là JSON)
        return response()->json([
            "status" => "success",
            "message" => "Danh sách san pham",
            "data" => $products,

        ]);
    }

    public function search(Request $request)
    {
        // Lấy tất cả tham số từ request
        $params = $request->only(['keyword', 'category', 'price_min', 'price_max']);

        $products = $this->productService->search($params);

        return response()->json([
            "status" => "success",
            "message" => "Danh sách san pham",
            "data" => $products,

        ]);
    }

    public function findById($id)
    {
        $product = $this->productService->findById($id);
        return response()->json([
            "status" => "success",
            "message" => "Danh sach san pham",
            "data" => $product,
        ]);
    }

    public function getNewProducts()
    {
        $products = $this->productService->getNewProducts();
        return response()->json([
            "status" => "success",
            "message" => "Danh sach san pham",
            "data" => $products,
        ]);
    }
}
