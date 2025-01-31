import { useState } from "react";
import DistrictSelector from "@/shared/components/ui/Account/AddressForm/DistrictSelector";
import ProvinceSelector from "@/shared/components/ui/Account/AddressForm/ProvinceSelector";
import WardSelector from "@/shared/components/ui/Account/AddressForm/WardSelector";
import { Province, District, Ward } from "@/shared/types/LocationTypes";

interface AddressFormProps {
  onConfirm: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ onConfirm }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [province, setProvince] = useState<Province>({} as Province);
  const [district, setDistrict] = useState<District>({} as District);
  const [ward, setWard] = useState<Ward>({} as Ward);
  const [address, setAddress] = useState<string>("");

  const handleProvinceSelect = (selectedProvince: Province) => {
    setProvince({ ...selectedProvince });
    setActiveTab(1); // Chuyển sang tab quận
  };

  const handleDistrictSelect = (selectedDistrict: District) => {
    setDistrict({ ...selectedDistrict });
    setActiveTab(2); // Chuyển sang tab phường
  };

  const handleWardSelect = (selectedWard: Ward) => {
    setWard({ ...selectedWard });
    setActiveTab(3); // Chuyển sang tab địa chỉ chi tiết
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleConfirmAddress = () => {
    console.log({ province, district, ward, address });
    onConfirm(); // Đóng modal sau khi xác nhận
  };

  const handleChange = (tabIndex: number) => {
    setActiveTab(tabIndex); // Nhảy đến tab tương ứng
  };

  return (
    <div className="address-form">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          Tỉnh/TP
        </button>
        <button
          className={`tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => setActiveTab(1)}
          disabled={!province}
        >
          Quận/Huyện
        </button>
        <button
          className={`tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => setActiveTab(2)}
          disabled={!district}
        >
          Phường/Xã
        </button>
        <button
          className={`tab ${activeTab === 3 ? "active" : ""}`}
          onClick={() => setActiveTab(3)}
          disabled={!ward}
        >
          Địa chỉ
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 0 && (
          <ProvinceSelector onSelect={handleProvinceSelect} />
        )}
        {activeTab === 1 && (
          <DistrictSelector
            provinceId={province.code}
            onSelect={handleDistrictSelect}
          />
        )}
        {activeTab === 2 && (
          <WardSelector
            districtId={district.code}
            onSelect={handleWardSelect}
          />
        )}
        {activeTab === 3 && (
          <div>
            <input
              type="text"
              placeholder="Nhập địa chỉ chi tiết"
              value={address}
              onChange={handleAddressChange}
            />
            <button onClick={handleConfirmAddress}>Xác nhận địa chỉ</button>
          </div>
        )}
      </div>

      <div className="selected-results">
        <h3>Kết quả đang chọn:</h3>
        <p>
          <strong>Tỉnh/TP:</strong> {province.name || "Chưa chọn"}
          {province && (
            <button className="change-button" onClick={() => handleChange(0)}>
              Thay đổi
            </button>
          )}
        </p>
        <p>
          <strong>Quận/Huyện:</strong> {district.name || "Chưa chọn"}
          {district && (
            <button className="change-button" onClick={() => handleChange(1)}>
              Thay đổi
            </button>
          )}
        </p>
        <p>
          <strong>Phường/Xã:</strong> {ward.name || "Chưa chọn"}
          {ward && (
            <button className="change-button" onClick={() => handleChange(2)}>
              Thay đổi
            </button>
          )}
        </p>
        <p>
          <strong>Địa chỉ chi tiết:</strong> {address || "Chưa nhập"}
          {address && (
            <button className="change-button" onClick={() => handleChange(3)}>
              Thay đổi
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default AddressForm;
