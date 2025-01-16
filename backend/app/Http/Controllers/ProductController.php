<?php

namespace App\Http\Controllers;

use App\Repositories\Interfaces\ProductRepositoryInterface;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    protected $productRepository;

    public function __construct(ProductRepositoryInterface $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function search(Request $request)
    {
        $keyword = $request->input('keyword');
        $products = $this->productRepository->search($keyword);
        return response()->json($products);
    }

    public function filter(Request $request)
    {
        $filters = $request->all();
        $products = $this->productRepository->filter($filters);
        return response()->json($products);
    }

    public function show($id)
    {
        $product = $this->productRepository->findById($id);
        return response()->json($product);
    }

    public function new()
    {
        $products = $this->productRepository->getNewProducts();
        return response()->json($products);
    }

    public function index()
    {
        $products = $this->productRepository->getAllProducts();
        return response()->json([
            "status" => "success",
            "message" => "Lấy danh sách sản phẩm thành công",
            "data" => $products
        ]);
    }
}
