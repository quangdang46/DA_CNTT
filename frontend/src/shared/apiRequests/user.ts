import apiClient from "@/shared/config/apiClient";
import { UserAdminResType } from "@/shared/types/UserTypes";
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
//   useUpdateUser: (id: string) => {
//     return useMutation({
//       mutationFn: async (body: ProductAdmin) => {
//         try {
//           const response = await apiClient.put<
//             ProductAdmin,
//             ResType<ProductAdmin>
//           >(`/users/update/${id}`, body);
//           return response;
//         } catch (error) {
//           console.error("API error:", error);
//           throw error;
//         }
//       },
//     });
//   },
//   useDeleteUser: () => {
//     return useMutation({
//       mutationFn: async (id: string) => {
//         try {
//           const response = await apiClient.delete<ResType<ProductAdmin>>(
//             `/users/delete/${id}`
//           );
//           return response;
//         } catch (error) {
//           console.error("API error:", error);
//           throw error;
//         }
//       },
//     });
//   },
};

export default userApiRequest;
