import apiClient from "@/shared/config/apiClient";
import { ResType } from "@/shared/types/resType";
import {
  TransactionAdminResType,
  TransactionBodyAdmin,
} from "@/shared/types/TransactionsType";
import { useMutation, useQuery } from "@tanstack/react-query";

const transactionsApiRequest = {
  useGetUsers: ({ page, perPage }: { page: number; perPage: number }) => {
    return useQuery<TransactionAdminResType, Error>({
      queryKey: ["transactions", page, perPage],
      queryFn: async () => {
        try {
          const response = await apiClient.get<TransactionAdminResType>(
            `/admin/transactions?page=${page}&per_page=${perPage}`
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
  useUpdateUser: () => {
    return useMutation({
      mutationFn: async ({
        id,
        body,
      }: {
        id: string;
        body: TransactionBodyAdmin;
      }) => {
        try {
          const response = await apiClient.put<
            TransactionBodyAdmin,
            ResType<TransactionBodyAdmin>
          >(`/admin/update-transaction/${id}`, body);
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
  useDeleteUser: () => {
    return useMutation({
      mutationFn: async (id: string) => {
        try {
          const response = await apiClient.delete<
            ResType<TransactionBodyAdmin>
          >(`/admin/delete-transaction/${id}`);
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
};

export default transactionsApiRequest;
