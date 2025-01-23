import accountApiRequest from "@/shared/apiRequests/account";
import { useTabs } from "@/shared/contexts/TabsContext";
import { setUser } from "@/shared/state/authSlice";
import { RootState } from "@/shared/state/store";
import { UpdateMeBody, UpdateMeBodyType } from "@/shared/types/UserTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function DetailsTab() {
  const { activeTab } = useTabs();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
  });

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  // Hook to use mutation from react-query
  const mutation = useMutation({
    mutationFn: async (data: UpdateMeBodyType) => {
      const response = await accountApiRequest.updateMe(data);
      if (!response.success) {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: (response) => {
      // Dispatch the updated user data to the store
      dispatch(setUser({ user: response.data.user }));
      toast.success(response.message);
      router.refresh();
    },
    onError: (error: any) => {
      // Handle error
      toast.error(error.message);
    },
  });

  // Submit handler for the form
  const onSubmit = async (data: UpdateMeBodyType) => {
    mutation.mutate(data); // Trigger mutation to update user data
  };

  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-details"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="woocommerce-EditAccountForm edit-account"
      >
        <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label htmlFor="name">
            Display name&nbsp;<span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            defaultValue={user?.name}
            className="woocommerce-Input woocommerce-Input--text input-text"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="woocommerce-form-row woocommerce-form-row--first form-row form-row-first">
          <label htmlFor="phone">
            Phone&nbsp;<span className="required">*</span>
          </label>
          <input
            type="text"
            id="phone"
            {...register("phone")}
            defaultValue={user?.phone}
            className="woocommerce-Input woocommerce-Input--text input-text"
          />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </div>
        <div className="woocommerce-form-row woocommerce-form-row--last form-row form-row-last">
          <label htmlFor="loyalty_points">
            Loyalty points&nbsp;<span className="required">*</span>
          </label>
          <input
            type="number"
            id="loyalty_points"
            {...register("loyalty_points")}
            readOnly
            defaultValue={user?.loyalty_points}
            className="woocommerce-Input woocommerce-Input--text input-text"
          />
          {errors.loyalty_points && (
            <p className="text-danger">{errors.loyalty_points.message}</p>
          )}
        </div>
        <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
          <label htmlFor="email">
            Email address&nbsp;<span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            defaultValue={user?.email}
            readOnly
            className="woocommerce-Input woocommerce-Input--email input-text"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="woocommerce-info">
          Change your password.
          <span className="button wc-forward">Change password</span>
        </div>
        {
          <fieldset className="animated">
            <legend>Password change</legend>
            <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
              <label htmlFor="password">
                Current password (leave blank to leave unchanged)
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="woocommerce-Input woocommerce-Input--password input-text"
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
            </div>
            <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
              <label htmlFor="password_1">
                New password (leave blank to leave unchanged)
              </label>
              <input
                type="password"
                id="password_1"
                {...register("password_1")}
                className="woocommerce-Input woocommerce-Input--password input-text"
              />
              {errors.password_1 && (
                <p className="text-danger">{errors.password_1.message}</p>
              )}
            </div>
            <div className="woocommerce-form-row woocommerce-form-row--wide form-row form-row-wide">
              <label htmlFor="password_2">Confirm new password</label>
              <input
                type="password"
                id="password_2"
                {...register("password_2")}
                className="woocommerce-Input woocommerce-Input--password input-text"
              />
              {errors.password_2 && (
                <p className="text-danger">{errors.password_2.message}</p>
              )}
            </div>
          </fieldset>
        }
        <button type="submit" className="woocommerce-Button button">
          Save changes
        </button>
      </form>
    </div>
  );
}
