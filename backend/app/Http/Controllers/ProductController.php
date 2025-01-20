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
        $perPage = $request->query('per_page', null);
        // Kiểm tra giá trị perPage hợp lệ (chỉ cho phép số dương)
        if ($perPage !== null && $perPage <= 0) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Giá trị phân trang không hợp lệ",
            ], 400);
        }

        $products = $this->productService->getAllProducts($perPage);

        // Trả về danh sách sản phẩm (có thể là JSON)
        return response()->json([
            "success" => true,
            "status" => "success",
            "message" => "Danh sách san pham tat ca",
            "data" => $products,

        ]);
    }

    public function search(Request $request)
    {
        // Lấy tất cả tham số từ request
        $params = $request->only(['keyword', 'category', 'price_min', 'price_max']);

        $products = $this->productService->search($params);

        return response()->json([
            "success" => true,
            "status" => "success",
            "message" => "Danh sách san pham search",
            "data" => $products,

        ]);
    }

    public function show($slug)
    {
        if (!$slug) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Product not found for slug: " . $slug,
                "data" => [],
            ], 404);
        }
        $product = $this->productService->findBySlug($slug);
        if (!$product) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Khong co san pham slug " . $slug,
                "data" => [],
            ], 400);
        }
        return response()->json([
            "success" => true,
            "status" => "success",
            "message" => "Danh sach san pham slug " . $slug,
            "data" => $product,
        ]);
    }

    public function byType(Request $request)
    {
        $type = $request->input('type');
        if (!$type) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Khong co san pham by type " . $type,
                "data" => [],
            ], 400);
        }
        $products = $this->productService->getProductByType($type);
        if ($products->isEmpty()) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Khong co san pham by type " . $type,
                "data" => [],
            ], 400);
        }
        return response()->json([
            "success" => true,
            "status" => "success",
            "message" => "Danh sach san pham theo type " . $type,
            "data" => $products,
        ]);
    }
}
