  useGetOrderPaginate: ({ page, perPage }: { page: number; perPage: number }) => {
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