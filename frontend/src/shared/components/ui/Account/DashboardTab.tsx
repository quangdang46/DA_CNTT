import { useTabs } from "@/shared/contexts/TabsContext";
import { RootState } from "@/shared/state/store";
import Link from "next/link";

import React from "react";
import { useSelector } from "react-redux";

export default function DashboardTab() {
  const { activeTab } = useTabs();
  // const [account, setAccount] = useState<UserResType>({} as UserResType); // UserResType hoặc null
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await accountApiRequest.me();
  //       if (response.success) {
  //         setAccount(response.data.user); // Cập nhật thông tin người dùng
  //       } else {
  //         console.error("Failed to fetch user data:", response.message);
  //         setIsError(true);
  //       }
  //     } catch (error) {
  //       console.error("Error while fetching user:", error);
  //       setIsError(true); // Cập nhật trạng thái lỗi
  //     } finally {
  //       setIsLoading(false); // Kết thúc loading
  //     }
  //   };

  //   fetchUser();
  // }, []);

  const { user, token } = useSelector((state: RootState) => state.auth);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error occurred while fetching user data.</div>;
  // }
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
        Hello <strong>{user.email}</strong> (not
        <strong> {user.email}</strong>?
        <Link href={`/my-account/logout?auth_token=${token}`}>Log out</Link>)
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
