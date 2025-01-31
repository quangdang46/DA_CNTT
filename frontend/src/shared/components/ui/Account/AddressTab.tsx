import { useTabs } from "@/shared/contexts/TabsContext";
import React, { useState } from "react";
import styles from "@/shared/style/AddressTab.module.css";
import AddressForm from "@/shared/components/ui/Account/AddressForm/AddressForm";
import { X } from "lucide-react";
import accountApiRequest from "@/shared/apiRequests/account";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/state/store";
import AddressShowForm from "@/shared/components/ui/Account/AddressForm/AddressShowForm";
import { Address } from "@/shared/types/LocationTypes";
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

export default function AddressTab() {
  const { activeTab } = useTabs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(true); // State để quản lý hiển thị form
  const [selectedAddress, setSelectedAddress] = useState<Address>(
    {} as Address
  ); // Lưu địa chỉ được chọn
  const { user } = useSelector((state: RootState) => state.auth);
  const { data } = accountApiRequest.useGetAddresses(user?.id);
  const initAddress = data?.data?.user.addresses;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setShowForm(true); // Đóng form khi đóng modal
    setSelectedAddress(null); // Reset địa chỉ được chọn
  };

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address); // Lưu địa chỉ được chọn
    setShowForm(true); // Hiển thị form chỉnh sửa
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
            onSetShowForm={setShowForm}
          />
        ) : (
          <AddressForm onConfirm={closeModal} curAddress={selectedAddress} />
        )}
      </Modal>
    </div>
  );
}
