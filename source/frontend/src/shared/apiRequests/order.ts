/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "@/shared/config/apiClient";
import {
  OrderAdminResType,
  OrderBodyAdmin,
  OrderGetResType,
  OrderType,
} from "@/shared/types/OrderTypes";
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
  useGetOrderPaginate: ({
    page,
    perPage,
  }: {
    page: number;
    perPage: number;
  }) => {
    return useQuery<OrderAdminResType, Error>({
      queryKey: ["orders-paginate", page, perPage],
      queryFn: async () => {
        try {
          const response = await apiClient.get<OrderAdminResType>(
            `/admin/orders?page=${page}&per_page=${perPage}`
          );

          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
      staleTime: 1000 * 60 * 5,
      placeholderData: (previousData) => previousData,
    });
  },
  useUpdateOrder: () => {
    return useMutation({
      mutationFn: async ({
        id,
        body,
      }: {
        id: string;
        body: OrderBodyAdmin;
      }) => {
        try {
          const response = await apiClient.put<
            OrderBodyAdmin,
            ResType<OrderBodyAdmin>
          >(`/admin/update-order/${id}`, body);
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  useDeleteOrder: () => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          const response = await apiClient.delete<ResType<OrderBodyAdmin>>(
            `/admin/delete-order/${id}`
          );
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  //////// order//////
};

export default orderApiRequest;
