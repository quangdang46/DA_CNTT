import apiClient from "@/shared/config/apiClient";
import { ProductListResType } from "@/shared/types/ProductTypes";
import { ResType } from "@/shared/types/resType";

const productApiRequest = {
  getList: () => apiClient.get<ResType<ProductListResType>>("/products"),
  getNewest: () => apiClient.get<ResType<ProductListResType>>("/products/new"),

  getDetail: (id: number) => apiClient.get(`/products/${id}`),

  //   create: (body: any) => apiClient.post("/products", body),
  //   update: (id: number, body: any) => apiClient.put(`/products/${id}`, body),
  //   delete: (id: number) => apiClient.delete(`/products/${id}`),
};

export default productApiRequest;
