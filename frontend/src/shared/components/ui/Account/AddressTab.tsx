import { useTabs } from "@/shared/contexts/TabsContext";
import React, { useState } from "react";
import styles from "@/shared/style/AddressTab.module.css";
import AddressForm from "@/shared/components/ui/Account/AddressForm/AddressForm";
import { X } from "lucide-react";
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        <AddressForm onConfirm={closeModal} />
      </Modal>
    </div>
  );
}
