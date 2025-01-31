<?php

namespace App\Http\Controllers;

use App\Services\LocationService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class LocationController extends Controller
{
    protected $locationService;

    public function __construct(LocationService $locationService)
    {
        $this->locationService = $locationService;
    }

    public function provinces()
    {
        try {
            $provinces = $this->locationService->provinces();
            return response()->json([
                'success' => true,
                'status' => "success",
                'message' => 'Lấy tất cả danh sách tỉnh thành thành công',
                'data' => $provinces
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => "error",
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }


    public function getDistricts(Request $request)
    {
        //
        try {
            $districts = $this->locationService->getDistricts($request->provinceId);
            return response()->json([
                'success' => true,
                'status' => "success",
                'message' => 'Lấy danh sách quận huyện theo tinh thành công',
                'data' => $districts
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => "error",
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }

    public function getWards(Request $request)
    {
        try {
            $wards = $this->locationService->getWards($request->districtId);
            return response()->json([
                'success' => true,
                'status' => "success",
                'message' => 'Lấy danh sách xã phường theo quận huyện thành công',
                'data' => $wards
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => "error",
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }


    public function addOrUpdate(Request $request)
    {
        try {
            try {
                $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng từ token
            } catch (JWTException $e) {
                return response()->json([
                    "success" => false,
                    'status' => 'error',
                    'message' => 'User not authenticated',
                    'data' => null
                ]);
            }
            $userId = $user->id;
            $result = $this->locationService->addOrUpdate($request, $userId);

            return response()->json([
                'success' => true,
                'status' => "success",
                'message' => 'Thao tác thành công',
                'data' => $result
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => "error",
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }

    public function delete(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate(); // Lấy thông tin người dùng từ token
        } catch (JWTException $e) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => 'User not authenticated',
                'data' => null
            ]);
        }
        $idAddress = $request->input('id');
        $result = $this->locationService->delete($idAddress);
        return response()->json([
            'success' => true,
            'status' => "success",
            'message' => 'Xóa điểm điểm thành công',
            'data' => $result
        ]);
    }
}
