<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
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
            ]);
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

    public function search(SearchRequest $request)
    {
        try {
            // Lấy tất cả tham số từ request
            $params = $request->only(['name', 'categories', 'minPrice', 'maxPrice','page', 'perPage', 'sortBy']);

            // Gọi service để thực hiện tìm kiếm
            $products = $this->productService->search($params);

            // Trả về kết quả tìm kiếm
            return response()->json([
                "success" => true,
                "status" => "success",
                "message" => "Danh sách sản phẩm tìm kiếm",
                "data" => $products,
            ]);
        } catch (\Exception $e) {
            // Bắt lỗi và trả về thông báo lỗi nếu có vấn đề xảy ra
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Đã xảy ra lỗi: " . $e->getMessage(),
            ]);  // Mã lỗi 500 - Internal Server Error
        }
    }

    public function show($slug)
    {
        if (!$slug) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Product not found for slug: " . $slug,
                "data" => [],
            ]);
        }
        $product = $this->productService->findBySlug($slug);
        if (!$product) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Khong co san pham slug " . $slug,
                "data" => [],
            ]);
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
            ]);
        }
        $products = $this->productService->getProductByType($type);
        if ($products->isEmpty()) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Khong co san pham by type " . $type,
                "data" => [],
            ]);
        }
        return response()->json([
            "success" => true,
            "status" => "success",
            "message" => "Danh sach san pham theo type " . $type,
            "data" => $products,
        ]);
    }

    public function related($slug)
    {
        if (!$slug) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Khong co san pham by related " . $slug,
                "data" => [],
            ]);
        }
        $products = $this->productService->getRelatedProducts($slug);
        return response()->json([
            "success" => true,
            "status" => "success",
            "message" => "Danh sach san pham theo type " . $slug,
            "data" => $products,
        ]);
    }
}
