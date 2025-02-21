import apiClient from "@/shared/config/apiClient";
import { ResType } from "@/shared/types/resType";
import { UserAdminResType, UserBodyAdmin } from "@/shared/types/UserTypes";
import { useMutation, useQuery } from "@tanstack/react-query";

const userApiRequest = {
  useGetUsers: ({ page, perPage }: { page: number; perPage: number }) => {
    return useQuery<UserAdminResType, Error>({
      queryKey: ["users", page, perPage],
      queryFn: async () => {
        try {
          const response = await apiClient.get<UserAdminResType>(
            `/users/user-paginate?page=${page}&per_page=${perPage}`
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
      mutationFn: async ({ id, body }: { id: string; body: UserBodyAdmin }) => {
        try {
          const response = await apiClient.put<
            UserBodyAdmin,
            ResType<UserBodyAdmin>
          >(`/users/update/${id}`, body);
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
          const response = await apiClient.delete<ResType<UserBodyAdmin>>(
            `/users/delete/${id}`
          );
          return response;
        } catch (error) {
          console.error("API error:", error);
          throw error;
        }
      },
    });
  },
};

export default userApiRequest;
