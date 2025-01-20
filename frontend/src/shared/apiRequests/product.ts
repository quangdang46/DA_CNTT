import apiClient from "@/shared/config/apiClient";
import { ProductListResType } from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";

const productApiRequest = {
  getList: () => apiClient.get<ResType<ProductListResType>>("/products"),
  getByUrlAndType: ({ url, type }: { url: string; type: string }) =>
    apiClient.post<{ type: string }, ResType<ProductListResType>>(url, {
      type,
    }),
  getDetail: (slug: string) => apiClient.get(`/products/${slug}`),

  //   create: (body: any) => apiClient.post("/products", body),
  //   update: (id: number, body: any) => apiClient.put(`/products/${id}`, body),
  //   delete: (id: number) => apiClient.delete(`/products/${id}`),
};

export default productApiRequest;
