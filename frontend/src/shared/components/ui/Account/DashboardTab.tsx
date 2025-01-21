import accountApiRequest from "@/shared/apiRequests/account";
import { useTabs } from "@/shared/contexts/TabsContext";
import { UserResType } from "@/shared/types/UserTypes";
import React, { useEffect, useState } from "react";

export default function DashboardTab() {
  const { activeTab } = useTabs();
  const [account, setAccount] = useState<UserResType>({} as UserResType); // UserResType hoặc null
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const response = await accountApiRequest.me();
        if (response.success) {
          setAccount(response.data.user); // Cập nhật thông tin người dùng
        } else {
          console.error("Failed to fetch user data:", response.message);
          setIsError(true);
        }
      } catch (error) {
        console.error("Error while fetching user:", error);
        setIsError(true); // Cập nhật trạng thái lỗi
      } finally {
        setIsLoading(false); // Kết thúc loading
      }
    };

    fetchUser();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching user data.</div>;
  }
  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-dashboard"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      <p>
        Hello <strong>{account.email}</strong> (not
        <strong> {account.email}</strong>?
        <a href="https://techmarket.madrasthemes.com/wp-login.php?action=logout&amp;redirect_to=https%3A%2F%2Ftechmarket.madrasthemes.com%2Fmy-account%2F&amp;_wpnonce=9672074694">
          Log out
        </a>
        )
      </p>

      <p>
        From your account dashboard you can view your
        <a href="https://techmarket.madrasthemes.com/my-account/orders/">
          recent orders
        </a>
        , manage your
        <a href="https://techmarket.madrasthemes.com/my-account/edit-address/">
          shipping and billing addresses
        </a>
        , and
        <a href="https://techmarket.madrasthemes.com/my-account/edit-account/">
          edit your password and account details
        </a>
        .
      </p>
    </div>
  );
}
