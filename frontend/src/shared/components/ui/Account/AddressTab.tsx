import { useTabs } from "@/shared/contexts/TabsContext";
import React, { useState } from "react";
import { Address } from "@/shared/types/LocationTypes";

import { convertAddress } from "@/shared/utils/convertAddress";
import locationApiRequest from "@/shared/apiRequests/locationApi";
import AddressModal from "@/shared/components/ui/Account/AddressForm/AddressModal";

export default function AddressTab() {
  const { data ,refetch} = locationApiRequest.useGetAddress();
  const initAddress = data?.data;
  const { activeTab } = useTabs();

  const defaultAddress = initAddress?.find(
    (item: Address) => item.is_default === 1
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

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
            <h2>
              {defaultAddress
                ? convertAddress(defaultAddress)
                : "Chưa có địa chỉ mặc định. Nhấn để thêm."}
            </h2>
          </header>
          <address>You have not set up this type of address yet.</address>
        </div>
      </div>
      <AddressModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      ></AddressModal>
    </div>
  );
}
