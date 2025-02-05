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
            "/checkout",
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
