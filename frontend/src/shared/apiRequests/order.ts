/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/shared/config/apiClient";
import { OrderAdminResType, OrderBodyAdmin, OrderGetResType, OrderType } from "@/shared/types/OrderTypes";
import { ResType } from "@/shared/types/resType";
import { useMutation, useQuery } from "@tanstack/react-query";

const orderApiRequest = {
  useCheckout: () => {
    return useMutation({
      mutationFn: async (payload: OrderType) => {
        try {
          const response = await apiClient.post<OrderType, any>(
            "/orders",
            payload
          );
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
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  useTrackOrder: () => {
    return useMutation({
      mutationFn: async (payload: any) => {
        try {
          const response = await apiClient.post<any, any>(
            "/orders/track-order",
            payload
          );
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  useGetOrder: () => {
    return useQuery({
      queryKey: ["orders"],
      queryFn: async () => {
        try {
          const response = await apiClient.get<OrderGetResType>("/orders");
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },

  //////// order//////

  //////// order//////
};

export default orderApiRequest;
