<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
class AdminController extends Controller
{
    //
    public function index()
    {
        try {
            try {
                $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng từ token
                $role = $user->role;
                if ($role != 'admin') {
                    return response()->json([
                        "success" => false,
                        'status' => 'error',
                        'message' => 'You are not admin',
                        'data' => null
                    ]);
                }
                // total user
                $totalUser = \App\Models\User::count();
                // total product
                $totalProduct = \App\Models\Product::count();
                // total order
                $totalOrder = \App\Models\Order::count();
                // total get all payment
                $payment = \App\Models\Payment::orderBy('id', 'desc')->take(5)->get();


                $revenueByHour = \App\Models\Order::where('status', 'delivered')
                    ->select(DB::raw("DATE_FORMAT(order_time, '%Y-%m-%d %H:00:00') as time"), DB::raw('SUM(total_price) as revenue'))
                    ->groupBy('time')
                    ->orderBy('time', 'ASC')
                    ->get();
                return response()->json([
                    "success" => true,
                    'status' => 'success',
                    'message' => 'Get data success',
                    'data' => [
                        'totalUser' => $totalUser,
                        'totalProduct' => $totalProduct,
                        'totalOrder' => $totalOrder,
                        'payment' => $payment,
                        'revenueByHour' => $revenueByHour
                    ]
                ]);
            } catch (\Throwable $th) {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'User not authenticated',
                    'data' => null
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => 500,
                'message' => 'Something went wrong',
                'data' => [],
                'error' => $th->getMessage()
            ]);
        }
    }
}
