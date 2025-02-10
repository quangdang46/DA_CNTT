<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

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
            $params = $request->only(['name', 'categories', 'minPrice', 'maxPrice', 'page', 'perPage', 'sortBy']);

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

    public function getProductsPaginate(Request $request)
    {
        try {
            $perPage = $request->query('per_page', null);
            $page = $request->query('page', null);
            $products = $this->productService->getProductPaginate($perPage, $page);
            return response()->json($products);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Khong co san pham  " . $th,
                "data" => [],
            ]);
        }
    }


    public function update(Request $request, $id)
    {

        try {

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'status' => 'required|string|in:available,out_of_stock,discontinued',
                'category_id' => 'required|exists:categories,id',
                'weight' => 'nullable|numeric|min:0',
                'attributes' => 'array',
                'attributes.*.key' => 'required|string',
                'attributes.*.value' => 'required|string',
                'images' => 'array',
                'images.*' => 'string', // Chấp nhận URL ảnh
            ]);

            // Cập nhật thông tin sản phẩm
            $product = \App\Models\Product::findOrFail($id);
            $product->update($validatedData);

            // Cập nhật hoặc tạo mới attributes
            if ($request->has('attributes')) {
                \App\Models\ProductAttribute::updateOrCreate(
                    ['product_id' => $id],
                    $request->only(['attributes'])
                );
            }

            // Cập nhật hình ảnh
            if ($request->has('images')) {
                // Xóa ảnh cũ
                \App\Models\ProductImage::where('product_id', $id)->delete();

                // Thêm ảnh mới
                foreach ($request->images as $imageUrl) {
                    \App\Models\ProductImage::create([
                        'product_id' => $id,
                        'image_url' => $imageUrl,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'Sản phẩm đã được cập nhật thành công'

            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Khong co san pham  " . $th,
                "data" => [],
            ]);
        }
    }

    // public function store(Request $request)
    // {
    //     try {
    //         // Validate dữ liệu
    //         $validatedData = $request->validate([
    //             'name' => 'required|string|max:255',
    //             'description' => 'nullable|string',
    //             'price' => 'required|numeric|min:0',
    //             'status' => 'required|string|in:available,out_of_stock,discontinued',
    //             'category_id' => 'required|exists:categories,id',
    //             'weight' => 'nullable|numeric|min:0',
    //             'attributes' => 'array',
    //             'attributes.*.key' => 'required|string',
    //             'attributes.*.value' => 'required|string',
    //             'images' => 'array',
    //             'images.*' => 'string', // Chấp nhận URL ảnh
    //         ]);
    //         $product = \App\Models\Product::create($validatedData);

    //         // Thêm thuộc tính
    //         if (!empty($validatedData['attributes'])) {
    //             foreach ($validatedData['attributes'] as $attr) {
    //                 \App\Models\ProductAttribute::create([
    //                     'product_id' => $product->id,
    //                     'key' => $attr['key'], // Đảm bảo lấy đúng giá trị key
    //                     'value' => $attr['value'], // Đảm bảo lấy đúng giá trị value
    //                 ]);
    //             }
    //         }

    //         // Thêm hình ảnh
    //         if ($request->has('images')) {
    //             foreach ($request->images as $imageUrl) {
    //                 \App\Models\ProductImage::create([
    //                     'product_id' => $product->id,
    //                     'image_url' => $imageUrl,
    //                 ]);
    //             }
    //         }

    //         return response()->json([
    //             'success' => true,
    //             'status' => 'success',
    //             'message' => 'Sản phẩm đã được thêm thành công',
    //             'data' => $product
    //         ]);
    //     } catch (\Throwable $th) {
    //         return response()->json([
    //             "success" => false,
    //             "status" => "error",
    //             "message" => "Lỗi khi thêm sản phẩm: " . $th->getMessage(),
    //             "data" => [],
    //         ]);
    //     }
    // }

    public function store(Request $request)
    {
        try {
            // Validate dữ liệu
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'required|numeric|min:0',
                'status' => 'required|string|in:available,out_of_stock,discontinued',
                'category_id' => 'required|exists:categories,id',
                'weight' => 'nullable|numeric|min:0',
                'attributes' => 'array',
                'attributes.*.key' => 'required|string',
                'attributes.*.value' => 'required|string',
                'images' => 'array',
                'images.*' => 'string', // Chấp nhận URL ảnh
            ]);

            // Tạo slug duy nhất
            $slug = Str::slug($validatedData['name']);
            $originalSlug = $slug;
            $counter = 1;

            // Kiểm tra xem slug đã tồn tại chưa
            while (\App\Models\Product::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }

            // Thêm slug vào dữ liệu
            $validatedData['slug'] = $slug;

            // Tạo sản phẩm mới
            $product = \App\Models\Product::create($validatedData);

            // Thêm thuộc tính
            if (!empty($validatedData['attributes'])) {
                $data = [
                    'product_id' => $product->id,

                ];
                foreach ($validatedData['attributes'] as $attr) {
                    $data[$attr['key']] = $attr['value'];
                }
                \App\Models\ProductAttribute::create($data);
            }
            // Thêm hình ảnh
            if ($request->has('images')) {
                foreach ($request->images as $imageUrl) {
                    \App\Models\ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $imageUrl,
                    ]);
                }
            }

            return response()->json([
                'success' => true,
                'status' => 'success',
                'message' => 'Sản phẩm đã được thêm thành công',
                'data' => $product,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                "status" => "error",
                "message" => "Lỗi khi thêm sản phẩm: " . $th->getMessage(),
                "data" => [],
            ]);
        }
    }
}
