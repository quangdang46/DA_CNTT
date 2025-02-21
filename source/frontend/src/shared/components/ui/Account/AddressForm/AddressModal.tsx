/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import styles from "@/shared/style/AddressTab.module.css";
import AddressForm from "@/shared/components/ui/Account/AddressForm/AddressForm";
import { X } from "lucide-react";
import AddressShowForm from "@/shared/components/ui/Account/AddressForm/AddressShowForm";
import { Address, AddressBodyType } from "@/shared/types/LocationTypes";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { ResType } from "@/shared/types/resType";
import apiClient from "@/shared/config/apiClient";
import locationApiRequest from "@/shared/apiRequests/locationApi";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <button className={styles.modal_close} onClick={onClose}>
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

const useDeleteAddress = () => {
  return useMutation<ResType<AddressBodyType>, Error, string>({
    mutationFn: async (id: string) => {
      try {
        const response = await apiClient.delete<ResType<AddressBodyType>>(
          `/locations/delete`,
          { data: { id } }
        );
        if (!response.success) {
          return response;
        }
        return response;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },
  });
};

const useSetDefaultAddress = () => {
  return useMutation<ResType<AddressBodyType>, Error, string>({
    mutationFn: async (id: string) => {
      try {
        const response = await apiClient.put<
          { id: string },
          ResType<AddressBodyType>
        >(`/locations/set-default`, { id });

        return response;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },
  });
};

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}
export default function AddressModal({ isModalOpen, setIsModalOpen }: Props) {
  const { data, refetch } = locationApiRequest.useGetAddress();
  const initAddress = data?.data || [];

  const { mutateAsync: deleteAddress } = useDeleteAddress();
  const { mutateAsync: setDefaultAddress } = useSetDefaultAddress();
  const [showForm, setShowForm] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<Address>(
    {} as Address
  );
  const closeModal = () => {
    setIsModalOpen(false);
    setShowForm(true); // Đóng form khi đóng modal
    setSelectedAddress({} as Address); // Reset địa chỉ được chọn
  };

  const handleEditAddress = (address: Address) => {
    if (!address) return;
    setSelectedAddress(address); // Lưu địa chỉ được chọn
    setShowForm(false); // Hiển thị form chỉnh sửa
  };

  const handleDeleteAddress = async (addressId: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Bạn có chắc chắn?",
      text: "Bạn có muốn xóa địa chỉ này không?",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await deleteAddress(addressId);
        await refetch(); // Refetch danh sách địa chỉ sau khi xóa
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Địa chỉ đã được xóa thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
        //  const response = await accountApiRequest.getAddresses(user?.id);
        //  console.log("Address deleted successfully:", response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Xóa địa chỉ thất bại. Vui lòng thử lại!",
        });
      }
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    const result = await Swal.fire({
      icon: "question",
      title: "Bạn có chắc chắn?",
      text: "Bạn có muốn đặt địa chỉ này làm mặc định không?",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        await setDefaultAddress(addressId);
        await refetch(); // Refetch danh sách địa chỉ sau khi cập nhật
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Địa chỉ mặc định đã được cập nhật thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Cập nhật địa chỉ mặc định thất bại. Vui lòng thử lại!",
        });
      }
    }
  };
  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      {showForm ? (
        <AddressShowForm
          initAddress={initAddress}
          onEditAddress={handleEditAddress}
          onDeleteAddress={handleDeleteAddress}
          onSetDefaultAddress={handleSetDefaultAddress}
          onSetShowForm={setShowForm}
        />
      ) : (
        <AddressForm
          onConfirm={closeModal}
          curAddress={selectedAddress}
          onSave={async () => {
            // Logic lưu địa chỉ mới hoặc đã chỉnh sửa
            console.log("Saving address...");
            await refetch();
            // Gọi API hoặc thực hiện hành động lưu địa chỉ ở đây
            setShowForm(true); // Quay lại danh sách địa chỉ sau khi lưu
          }}
        />
      )}
    </Modal>
  );
}
