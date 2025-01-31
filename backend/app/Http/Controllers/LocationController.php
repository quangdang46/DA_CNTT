<?php

namespace App\Http\Controllers;

use App\Services\LocationService;
use Illuminate\Http\Request;

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

    public function getWards(Request $request){
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
}
