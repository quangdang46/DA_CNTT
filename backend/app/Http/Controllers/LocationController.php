<?php

namespace App\Http\Controllers;

use App\Services\GHTKService;
use App\Services\LocationService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Str;

class LocationController extends Controller
{
    protected $locationService;
    protected $ghtkService;

    public function __construct(LocationService $locationService, GHTKService $ghtkService)
    {
        $this->locationService = $locationService;
        $this->ghtkService = $ghtkService;
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
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
                $guestId = null; // Không cần UUID nếu đã đăng nhập
            } catch (JWTException $e) {
                $guestId = $request->header('X-Guest-ID');
                $userId = null; // Khách chưa đăng nhập
            }
            $result = $this->locationService->addOrUpdate($request, $userId, $guestId);

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
            $user = JWTAuth::parseToken()->authenticate();
            $userId = $user->id;
            $guestId = null; // Không cần UUID nếu đã đăng nhập
        } catch (JWTException $e) {
            $guestId = $request->header('X-Guest-ID');
            $userId = null; // Khách chưa đăng nhập
        }
        $idAddress = $request->input('id');
        $result = $this->locationService->delete($idAddress, $userId, $guestId);
        return response()->json([
            'success' => true,
            'status' => "success",
            'message' => 'Xóa điểm điểm thành công',
            'data' => $result
        ]);
    }


    public function setDefault(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $userId = $user->id;
            $guestId = null; // Không cần UUID nếu đã đăng nhập
        } catch (JWTException $e) {
            $guestId = $request->header('X-Guest-ID');
            $userId = null; // Khách chưa đăng nhập
        }

        $idAddress = $request->input('id');
        if (!$idAddress) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => 'ID address is required',
                'data' => null
            ]);
        }

        // Tìm địa chỉ và cập nhật địa chỉ mặc định
        $result = $this->locationService->setDefault($userId, $guestId, $idAddress);
        if ($result === false) {
            return response()->json([
                "success" => false,
                'status' => 'error',
                'message' => 'Failed to set default address',
                'data' => null
            ]);
        }

        return response()->json([
            'success' => true,
            'status' => "success",
            'message' => 'Cập nhật địa chỉ mặc định thành công',
            'data' => $result
        ]);
    }

    public function getAddresses(Request $request)
    {
        try {
            try {
                $user = JWTAuth::parseToken()->authenticate();
                $userId = $user->id;
                $guestId = null; // Không cần UUID nếu đã đăng nhập
            } catch (JWTException $e) {
                $guestId = $request->header('X-Guest-ID') ?? Str::uuid();
                $userId = null; // Khách chưa đăng nhập
            }

            $addresses = $this->locationService->getAddresses($userId, $guestId);
            return response()->json([
                'success' => true,
                'status' => "success",
                'message' => 'Lấy danh sách điểm thành công',
                'data' => $addresses
            ])->header('X-Guest-ID', $guestId);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'status' => "error",
                'message' => $th->getMessage(),
                'data' => []
            ]);
        }
    }

    public function shippingFee(Request $request)
    {
        try {
            $commonData = [
                'pick_province'   => 'Hà Nội',
                'pick_district'   => 'Cầu Giấy',
                'province'        => $request->input('province'),
                'district'        => $request->input('district'),
                'ward'            => $request->input('ward'),
                'address'         => $request->input('address'),
                'weight'          => 500,
                // 'transport'       => 'road',
                // 'deliver_option'  => 'xteam',
            ];
            $normalData = array_merge($commonData, ['deliver_option' => 'xteam', 'transport' => 'road']);
            $expressData = array_merge($commonData, ['deliver_option' => 'none', 'transport' => 'air']);
            $normalFee = $this->ghtkService->calculateShippingFee($normalData);
            $expressFee = $this->ghtkService->calculateShippingFee($expressData);

            return response()->json([
                'success' => true,
                'normal' => [
                    'fee' => $normalFee['fee']['fee'],
                ],
                'express' => [
                    'fee' => $expressFee['fee']['fee'],
                ],
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
