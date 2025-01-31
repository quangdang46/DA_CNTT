// import { useState } from "react";
// import DistrictSelector from "@/shared/components/ui/Account/AddressForm/DistrictSelector";
// import ProvinceSelector from "@/shared/components/ui/Account/AddressForm/ProvinceSelector";
// import WardSelector from "@/shared/components/ui/Account/AddressForm/WardSelector";
// import { Province, District, Ward } from "@/shared/types/LocationTypes";

// interface AddressFormProps {
//   onConfirm: () => void;
//   curProvince?: Province;
//   curDistrict?: District;
//   curWard?: Ward;
//   curAddress?: string;
// }

// const AddressForm: React.FC<AddressFormProps> = ({
//   onConfirm,
//   curProvince,
//   curDistrict,
//   curWard,
//   curAddress,
// }) => {
//   const [activeTab, setActiveTab] = useState<number>(0);
//   const [province, setProvince] = useState<Province>(
//     curProvince || ({} as Province)
//   );
//   const [district, setDistrict] = useState<District>(
//     curDistrict || ({} as District)
//   );
//   const [ward, setWard] = useState<Ward>(curWard || ({} as Ward));
//   const [address, setAddress] = useState<string>(curAddress || "");

//   const handleProvinceSelect = (selectedProvince: Province) => {
//     setProvince({ ...selectedProvince });
//     setActiveTab(1); // Chuyển sang tab quận
//   };

//   const handleDistrictSelect = (selectedDistrict: District) => {
//     setDistrict({ ...selectedDistrict });
//     setActiveTab(2); // Chuyển sang tab phường
//   };

//   const handleWardSelect = (selectedWard: Ward) => {
//     setWard({ ...selectedWard });
//     setActiveTab(3); // Chuyển sang tab địa chỉ chi tiết
//   };

//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAddress(e.target.value);
//   };
//   //////////////////////////////////////////////////
//   //////////////////////////////////////////////////
//   //////////////////////////////////////////////////
//   //////////////////////////////////////////////////
//   const handleConfirmAddress = () => {
//     console.log({ province, district, ward, address });
//     onConfirm(); // Đóng modal sau khi xác nhận
//   };
//   //////////////////////////////////////////////////
//   //////////////////////////////////////////////////
//   //////////////////////////////////////////////////
//   //////////////////////////////////////////////////

//   const handleChange = (tabIndex: number) => {
//     setActiveTab(tabIndex); // Nhảy đến tab tương ứng
//   };

//   return (
//     <div className="address-form">
//       <div className="top-modal-address">
//         <b>Thêm điểm giao hàng</b>
//         <p className="full-location">
//           <span>Điểm giao hàng:</span>
//           <span className="full-address">
//             {[province.name, district.name, ward.name, address]
//               .filter(Boolean) // Loại bỏ các giá trị falsy (null, undefined, "")
//               .join(", ")}
//           </span>
//         </p>
//       </div>

//       <div className="tabs">
//         <button
//           className={`tab ${activeTab === 0 ? "active" : ""}`}
//           onClick={() => setActiveTab(0)}
//         >
//           Tỉnh/TP
//         </button>
//         <button
//           className={`tab ${activeTab === 1 ? "active" : ""}`}
//           onClick={() => setActiveTab(1)}
//           disabled={province.code === undefined}
//         >
//           Quận/Huyện
//         </button>
//         <button
//           className={`tab ${activeTab === 2 ? "active" : ""}`}
//           onClick={() => setActiveTab(2)}
//           disabled={district.code === undefined}
//         >
//           Phường/Xã
//         </button>
//         <button
//           className={`tab ${activeTab === 3 ? "active" : ""}`}
//           onClick={() => setActiveTab(3)}
//           disabled={ward.code === undefined}
//         >
//           Địa chỉ
//         </button>
//       </div>

//       <div className="tab-content">
//         {activeTab === 0 && (
//           <ProvinceSelector onSelect={handleProvinceSelect} />
//         )}
//         {activeTab === 1 && (
//           <DistrictSelector
//             provinceId={province.code}
//             onSelect={handleDistrictSelect}
//           />
//         )}
//         {activeTab === 2 && (
//           <WardSelector
//             districtId={district.code}
//             onSelect={handleWardSelect}
//           />
//         )}
//         {activeTab === 3 && (
//           <>
//             <input
//               type="text"
//               placeholder="Nhập địa chỉ chi tiết"
//               value={address}
//               onChange={handleAddressChange}
//             />
//             <button onClick={handleConfirmAddress}>Xác nhận địa chỉ</button>
//           </>
//         )}
//       </div>

//       <div className="selected-results">
//         <h4>Kết quả đang chọn:</h4>
//         <p>
//           <strong>Tỉnh/TP:</strong> {province.name || "Chưa chọn"}
//           {province && (
//             <button className="change-button" onClick={() => handleChange(0)}>
//               Thay đổi
//             </button>
//           )}
//         </p>
//         <p>
//           <strong>Quận/Huyện:</strong> {district.name || "Chưa chọn"}
//           {district && (
//             <button className="change-button" onClick={() => handleChange(1)}>
//               Thay đổi
//             </button>
//           )}
//         </p>
//         <p>
//           <strong>Phường/Xã:</strong> {ward.name || "Chưa chọn"}
//           {ward && (
//             <button className="change-button" onClick={() => handleChange(2)}>
//               Thay đổi
//             </button>
//           )}
//         </p>
//         <p>
//           <strong>Địa chỉ chi tiết:</strong> {address || "Chưa nhập"}
//           {address && (
//             <button className="change-button" onClick={() => handleChange(3)}>
//               Thay đổi
//             </button>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AddressForm;

import { useState, useCallback } from "react";
import DistrictSelector from "@/shared/components/ui/Account/AddressForm/DistrictSelector";
import ProvinceSelector from "@/shared/components/ui/Account/AddressForm/ProvinceSelector";
import WardSelector from "@/shared/components/ui/Account/AddressForm/WardSelector";
import {
  Province,
  District,
  Ward,
  Address,
} from "@/shared/types/LocationTypes";

interface AddressFormProps {
  onConfirm: () => void;
  curAddress?: Address;
}

const AddressForm: React.FC<AddressFormProps> = ({ onConfirm, curAddress }) => {
  console.log("curAddress", curAddress);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [province, setProvince] = useState<Province>(
    curAddress?.province || ({} as Province)
  );
  const [district, setDistrict] = useState<District>(
    curAddress?.district || ({} as District)
  );
  const [ward, setWard] = useState<Ward>(curAddress?.ward || ({} as Ward));
  const [address, setAddress] = useState<string>(curAddress?.address || "");

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

  const handleConfirmAddress = () => {
    if (!province.name || !district.name || !ward.name || !address) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ.");
      return;
    }
    console.log({ province, district, ward, address });
    onConfirm(); // Đóng modal sau khi xác nhận
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
          <ProvinceSelector onSelect={handleProvinceSelect} curProvinceId={province.code} />
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
            <button onClick={handleConfirmAddress}>Xác nhận địa chỉ</button>
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
