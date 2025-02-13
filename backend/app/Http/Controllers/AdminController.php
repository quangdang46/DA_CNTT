
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