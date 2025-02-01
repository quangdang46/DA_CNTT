import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2
import { addToCart, clearCart, removeFromCart } from "@/shared/state/cartSlice"; // Import Redux actions
import apiClient from "@/shared/config/apiClient";
import {
  AddToCartRequest,
  AddToCartResponse,
  ClearCartResponse,
  GetCartResponse,
  RemoveFromCartRequest,
  RemoveFromCartResponse,
} from "@/shared/types/CartTypes";
import { Product } from "@/shared/types/ProductTypes";

// Custom hook cho giỏ hàng
export const useCart = () => {
  const dispatch = useDispatch();

  // Sử dụng React Query để lấy dữ liệu giỏ hàng từ backend
  const {
    data: cartData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"], // Key của query
    queryFn: async (): Promise<GetCartResponse> => {
      const response = await apiClient.get<GetCartResponse>("/cart");
      return response;
    },
  });

  const handleAddToCart = useMutation<
    AddToCartResponse,
    Error,
    AddToCartRequest
  >({
    mutationFn: async (product: Product) => {
      const response = await apiClient.post<
        AddToCartRequest,
        AddToCartResponse
      >("/cart/add", {
        product_id: product.id,
        quantity: 1,
      });
      return response;
    },
    onSuccess: (data) => {
      dispatch(addToCart(data.data));
      refetch();
      Swal.fire({
        icon: "success",
        title: "Thêm vào giỏ hàng thành công!",
        text: `${data.data.name} đã được thêm vào giỏ hàng.`,
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Lỗi khi thêm sản phẩm!",
        text: error?.response?.data?.message || "Đã xảy ra lỗi.",
      });
    },
  });

  const handleRemoveFromCart = useMutation<
    RemoveFromCartResponse,
    Error,
    string
  >({
    mutationFn: async (productId: string) => {
      const response = await apiClient.post<
        RemoveFromCartRequest,
        RemoveFromCartResponse
      >("/cart/remove", {
        product_id: productId,
      });
      return response;
    },
    onSuccess: (_, productId) => {
      // Dispatch action Redux để cập nhật state
      dispatch(removeFromCart(productId));
      refetch(); // Refetch dữ liệu giỏ hàng
      Swal.fire({
        icon: "success",
        title: "Xóa sản phẩm thành công!",
        text: "Sản phẩm đã được xóa khỏi giỏ hàng.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Lỗi khi xóa sản phẩm!",
        text: error?.response?.data?.message || "Đã xảy ra lỗi.",
      });
    },
  });

  const handleClearCart = useMutation<ClearCartResponse, Error>({
    mutationFn: async () => {
      const response = await apiClient.post<null, ClearCartResponse>(
        "/cart/clear"
      );
      return response.data;
    },
    onSuccess: () => {
      // Dispatch action Redux để cập nhật state
      dispatch(clearCart());
      refetch(); // Refetch dữ liệu giỏ hàng
      Swal.fire({
        icon: "success",
        title: "Xóa toàn bộ giỏ hàng thành công!",
        text: "Giỏ hàng của bạn đã được làm sạch.",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error: any) => {
      Swal.fire({
        icon: "error",
        title: "Lỗi khi xóa toàn bộ giỏ hàng!",
        text: error?.response?.data?.message || "Đã xảy ra lỗi.",
      });
    },
  });

  return {
    cartItems: cartData?.items || [], // Danh sách sản phẩm trong giỏ hàng
    totalPrice: cartData?.total || 0, // Tổng tiền
    isLoading, // Trạng thái loading
    handleAddToCart: handleAddToCart.mutate, // Hàm thêm sản phẩm
    handleRemoveFromCart: handleRemoveFromCart.mutate, // Hàm xóa sản phẩm
    handleClearCart: handleClearCart.mutate, // Hàm xóa toàn bộ giỏ hàng
  };
};
