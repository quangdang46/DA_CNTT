/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/shared/config/apiClient";
import { OrderType } from "@/shared/types/OrderTypes";
import { useMutation } from "@tanstack/react-query";

const orderApiRequest = {
  useCheckout: () => {
    return useMutation({
      mutationFn: async (payload: OrderType) => {
        try {
          const response = await apiClient.post<OrderType, any>(
            "/orders",
            payload
          );
          console.log("response", response);
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  useReturnPayment: () => {
    return useMutation({
      mutationFn: async (payload: any) => {
        try {
          const response = await apiClient.post<any, any>(
            "/vnpay/paymentReturn",
            payload
          );
          console.log("response", response);
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
};

export default orderApiRequest;
