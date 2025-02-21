/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckBox from "@/shared/components/ui/Component/CheckBox";
import { Address } from "@/shared/types/LocationTypes";
import { convertAddress } from "@/shared/utils/convertAddress";
import { PencilOff, Plus, Trash2 } from "lucide-react";
import React from "react";
interface AddressShowFormProps {
  initAddress: Address[] | null;
  onEditAddress: (address: Address) => void;
  onDeleteAddress: (addressId: string) => void;
  onSetDefaultAddress: (addressId: string) => void;
  onSetShowForm: (showForm: boolean) => void;
}

const AddressShowForm = ({
  initAddress,
  onEditAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  onSetShowForm,
}: AddressShowFormProps) => {
  return (
    <div className="address-form">
      <b className="title">Danh sách địa chỉ</b>
      <ul>
        {initAddress && initAddress.map((address) => (
          <li key={address.id} className="address-item">
            <div className="address-item-content">
              <CheckBox
                name="default"
                label={convertAddress(address)}
                val={address.is_default === 1}
                setValue={() => onSetDefaultAddress(address.id)} // Xử lý đặt địa chỉ mặc định
              />
              {address.is_default == 1 && (
                <span className="default-address">Mặc đinh</span>
              )}
            </div>
            <div className="address-item-action">
              <div
                className="edit-address"
                onClick={() => {
                  onEditAddress(address);
                  onSetShowForm(false);
                }}
              >
                <PencilOff size={15} />
                <span>Thay đổi</span>
              </div>

              <div
                className="remove-address"
                onClick={() => onDeleteAddress(address.id)}
              >
                <Trash2 size={15} />
                <span>Xóa</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="add-address" onClick={() => onSetShowForm(false)}>
        <Plus />
        <span>Them moi</span>
      </div>
    </div>
  );
};

export default AddressShowForm;
