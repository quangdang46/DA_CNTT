import { useTabs } from "@/shared/contexts/TabsContext";
import React, { useState } from "react";
import styles from "@/shared/style/AddressTab.module.css";
import AddressForm from "@/shared/components/ui/Account/AddressForm/AddressForm";
import { X } from "lucide-react";
import accountApiRequest from "@/shared/apiRequests/account";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/state/store";
import AddressShowForm from "@/shared/components/ui/Account/AddressForm/AddressShowForm";
import { Address, AddressBodyType } from "@/shared/types/LocationTypes";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { ResType } from "@/shared/types/resType";
import apiClient from "@/shared/config/apiClient";
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
        return response.data;
      } catch (error) {
        console.error("API error:", error);
        throw error;
      }
    },
  });
};
export default function AddressTab() {
  const { activeTab } = useTabs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(true); // State để quản lý hiển thị form
  const [selectedAddress, setSelectedAddress] = useState<Address>(
    {} as Address
  ); // Lưu địa chỉ được chọn
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, refetch } = accountApiRequest.useGetAddresses(user?.id);
  const initAddress = data?.data?.user.addresses;

  const { mutateAsync: deleteAddress } = useDeleteAddress();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setShowForm(true); // Đóng form khi đóng modal
    setSelectedAddress({} as Address); // Reset địa chỉ được chọn
  };

  const handleEditAddress = (address: Address) => {
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

  const handleSetDefaultAddress = (addressId: string) => {
    // Logic đặt địa chỉ mặc định
    console.log(`Setting default address to id ${addressId}`);
    // Gọi API hoặc thực hiện hành động đặt địa chỉ mặc định ở đây
    // Sau đó, cập nhật lại danh sách địa chỉ nếu cần
    Swal.fire("Success!", "Your default address has been updated.", "success");
  };
  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-address"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      <p>
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="u-columns woocommerce-Addresses col2-set addresses">
        <div className="u-column1 col-1 woocommerce-Address">
          <header
            className="woocommerce-Address-title title align-items-end"
            onClick={openModal}
          >
            <h2>Billing address</h2>
          </header>
          <address>You have not set up this type of address yet.</address>
        </div>
      </div>
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
    </div>
  );
}
