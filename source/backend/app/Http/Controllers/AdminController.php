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

    public function getTransaction(Request $request)
    {
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
            $perPage = $request->query('per_page', null);
            $page = $request->query('page', null);
            $payments = \App\Models\Payment::query()
                ->paginate($perPage, ['*'], 'page', $page);


            return $payments;
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }

    public function updateTransaction(Request $request, $id)
    {
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
            $payment = \App\Models\Payment::find($id);
            if (!$payment) {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'Payment not found',
                    'data' => null
                ]);
            }
            $payment->update($request->all());
            return response()->json([
                "success" => true,
                'status' => 'success',
                'message' => 'Update payment success',
                'data' => $payment
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }

    public function deleteTransaction($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng của token
            $role = $user->role;
            if ($role != 'admin') {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'You are not admin',
                    'data' => null
                ]);
            }
            $payment = \App\Models\Payment::find($id);
            if (!$payment) {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'Payment not found',
                    'data' => null
                ]);
            }
            $payment->delete();
            return response()->json([
                "success" => true,
                'status' => 'success',
                'message' => 'Delete payment success',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }
    // //////// Order //////////

    public function getOrders(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng.fromFunction token
            $role = $user->role;
            if ($role != 'admin') {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'You are not admin',
                    'data' => null
                ]);
            }
            $perPage = $request->query('per_page', null);
            $page = $request->query('page', null);
            $orders = \App\Models\Order::query()
                ->paginate($perPage, ['*'], 'page', $page);
            return $orders;
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }

    public function updateOrder(Request $request, $id)
    {
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
            $order = \App\Models\Order::find($id);
            if (!$order) {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'Order not found',
                    'data' => null
                ]);
            }
            $order->update($request->all());
            return response()->json([
                "success" => true,
                'status' => 'success',
                'message' => 'Order payment success',
                'data' => $order
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }

    public function deleteOrder($id)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng của token
            $role = $user->role;
            if ($role != 'admin') {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'You are not admin',
                    'data' => null
                ]);
            }
            $orders = \App\Models\Order::find($id);
            if (!$orders) {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'Order not found',
                    'data' => null
                ]);
            }
            $orders->delete();
            return response()->json([
                "success" => true,
                'status' => 'success',
                'message' => 'Order payment success',
                'data' => $orders
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => $th->getMessage(),
                'data' => null
            ]);
        }
    }

    // //////// Order //////////

}
