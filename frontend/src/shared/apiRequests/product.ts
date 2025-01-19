import apiClient from "@/shared/config/apiClient";
import { ProductListResType } from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";

const productApiRequest = {
  getList: () => apiClient.get<ResType<ProductListResType>>("/products"),
  getByUrl: (url: string) => apiClient.get<ResType<ProductListResType>>(url),

  getDetail: (id: number) => apiClient.get(`/products/details/${id}`),

  //   create: (body: any) => apiClient.post("/products", body),
  //   update: (id: number, body: any) => apiClient.put(`/products/${id}`, body),
  //   delete: (id: number) => apiClient.delete(`/products/${id}`),
};

export default productApiRequest;
