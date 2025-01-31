import { useState, useCallback } from "react";
import DistrictSelector from "@/shared/components/ui/Account/AddressForm/DistrictSelector";
import ProvinceSelector from "@/shared/components/ui/Account/AddressForm/ProvinceSelector";
import WardSelector from "@/shared/components/ui/Account/AddressForm/WardSelector";
import {
  Province,
  District,
  Ward,
  Address,
  AddressBodyType,
} from "@/shared/types/LocationTypes";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { ResType } from "@/shared/types/resType";
import apiClient from "@/shared/config/apiClient";

const useUpdateOrAddAddress = () => {
  return useMutation<ResType<AddressBodyType>, Error, AddressBodyType>({
    mutationFn: async (bodyData) => {
      try {
        const response = await apiClient.post<
          AddressBodyType,
          ResType<AddressBodyType>
        >("/locations/addOrUpdate", bodyData);
        if (!response.success) {
          throw new Error(
            response.message || "Failed to update or add address"
          );
        }
        return response;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },
  });
};
interface AddressFormProps {
  onConfirm: () => void;
  curAddress?: Address;
  onSave: () => void; // Thêm onSave callback để lưu địa chỉ sau khi chỉnh sửa
}

const AddressForm: React.FC<AddressFormProps> = ({
  onConfirm,
  curAddress,
  onSave,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [province, setProvince] = useState<Province>(
    curAddress?.province || ({} as Province)
  );
  const [district, setDistrict] = useState<District>(
    curAddress?.district || ({} as District)
  );
  const [ward, setWard] = useState<Ward>(curAddress?.ward || ({} as Ward));
  const [address, setAddress] = useState<string>(curAddress?.address || "");
  const { mutate, isPending } = useUpdateOrAddAddress();
  const handleProvinceSelect = useCallback((selectedProvince: Province) => {
    setProvince(selectedProvince);
    setActiveTab(1); // Chuyển sang tab quận
  }, []);

  const handleDistrictSelect = useCallback((selectedDistrict: District) => {
    setDistrict(selectedDistrict);
    setActiveTab(2); // Chuyển sang tab phường
  }, []);

  const handleWardSelect = useCallback((selectedWard: Ward) => {
    setWard(selectedWard);
    setActiveTab(3); // Chuyển sang tab địa chỉ chi tiết
  }, []);

  const handleAddressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value);
    },
    []
  );

  const handleConfirmAddress = async () => {
    if (!province.name || !district.name || !ward.name || !address) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng điền đầy đủ thông tin địa chỉ.",
      });
      return;
    }

    const bodyData = {
      id: curAddress?.id || "",
      address: address,
      ward_code: ward.code,
      district_code: district.code,
      province_code: province.code,
    };

    try {
      // Gọi API bằng mutate
      await mutate(bodyData, {
        onSuccess: (response) => {
          console.log("response", response);
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Địa chỉ đã được lưu thành công!",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            onSave(); // Gọi onSave để lưu địa chỉ
            onConfirm(); // Đóng modal sau khi xác nhận
          });
        },
        onError: (error) => {
          console.error("Lỗi khi lưu địa chỉ:", error);
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Đã xảy ra lỗi khi lưu địa chỉ. Vui lòng thử lại!",
          });
        },
      });
    } catch (error) {
      console.error("Lỗi khi lưu địa chỉ:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi lưu địa chỉ. Vui lòng thử lại!",
      });
    }
  };

  const handleChangeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="address-form">
      <div className="top-modal-address">
        <b>Thêm điểm giao hàng</b>
        <p className="full-location">
          <span>Điểm giao hàng:</span>
          <span className="full-address">
            {[province.name, district.name, ward.name, address]
              .filter(Boolean)
              .join(", ")}
          </span>
        </p>
      </div>

      <div className="tabs">
        {[0, 1, 2, 3].map((tabIndex) => (
          <button
            key={tabIndex}
            className={`tab ${activeTab === tabIndex ? "active" : ""}`}
            onClick={() => handleChangeTab(tabIndex)}
            disabled={
              (tabIndex === 1 && !province.code) ||
              (tabIndex === 2 && !district.code) ||
              (tabIndex === 3 && !ward.code)
            }
          >
            {["Tỉnh/TP", "Quận/Huyện", "Phường/Xã", "Địa chỉ"][tabIndex]}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 0 && (
          <ProvinceSelector
            onSelect={handleProvinceSelect}
            curProvinceId={province.code}
          />
        )}
        {activeTab === 1 && (
          <DistrictSelector
            provinceId={province.code}
            curDistrictId={district.code}
            onSelect={handleDistrictSelect}
          />
        )}
        {activeTab === 2 && (
          <WardSelector
            districtId={district.code}
            curWardId={ward.code}
            onSelect={handleWardSelect}
          />
        )}
        {activeTab === 3 && (
          <>
            <input
              type="text"
              placeholder="Nhập địa chỉ chi tiết"
              value={address}
              onChange={handleAddressChange}
            />
            <button onClick={() => handleConfirmAddress()}>
              Xác nhận địa chỉ
            </button>
          </>
        )}
      </div>

      <div className="selected-results">
        <h4>Kết quả đang chọn:</h4>
        {[
          { label: "Tỉnh/TP", value: province.name, tabIndex: 0 },
          { label: "Quận/Huyện", value: district.name, tabIndex: 1 },
          { label: "Phường/Xã", value: ward.name, tabIndex: 2 },
          { label: "Địa chỉ chi tiết", value: address, tabIndex: 3 },
        ].map((item) => (
          <p key={item.label}>
            <strong>{item.label}:</strong> {item.value || "Chưa chọn"}
            {item.value && (
              <button
                className="change-button"
                onClick={() => handleChangeTab(item.tabIndex)}
              >
                Thay đổi
              </button>
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export default AddressForm;
