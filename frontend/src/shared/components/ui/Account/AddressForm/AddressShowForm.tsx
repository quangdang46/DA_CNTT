/* eslint-disable @typescript-eslint/no-explicit-any */
import { Address } from "@/shared/types/LocationTypes";
import { convertAddress } from "@/shared/utils/convertAddress";
import React from "react";

interface AddressShowFormProps {
  initAddress: Address[]; // Danh sách địa chỉ
  onEditAddress: (address: Address) => void; // Callback khi người dùng chọn "Thay đổi"
  onSetShowForm: (showForm: boolean) => void;
}

const AddressShowForm = ({
  initAddress,
  onEditAddress,
  onSetShowForm,
}: AddressShowFormProps) => {
  console.log("initAddress", initAddress);
  return (
    <div>
      <h3>Danh sách địa chỉ</h3>
      {initAddress.map((address) => (
        <div key={address.id} style={{ marginBottom: "10px" }}>
          <p>{convertAddress(address)}</p>
          <button
            onClick={() => {
              onEditAddress(address);
              onSetShowForm(false);
            }}
          >
            Thay đổi
          </button>
        </div>
      ))}
    </div>
  );
};

export default AddressShowForm;
