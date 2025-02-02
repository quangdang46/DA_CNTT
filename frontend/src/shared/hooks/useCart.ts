/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch} from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  addToCart,
  clearCart,
  removeFromCart,
} from "@/shared/state/cartSlice"; // Import Redux actions
import apiClient from "@/shared/config/apiClient";
import {
  AddToCartBody,
  AddToCartResType,
  CartRemoveBody,
  ClearCartBody,
  ClearCartResType,
  GetCartResType,
  RemoveFromCartResType,
} from "@/shared/types/CartTypes";
import { Product } from "@/shared/types/ProductTypes";

// Custom hook cho giỏ hàng
export const useCart = () => {
  const dispatch = useDispatch();

  // Query để lấy dữ liệu giỏ hàng
  const {
    data: cartData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cart"], // Key của query
    queryFn: async (): Promise<GetCartResType> => {
      const response = await apiClient.get<GetCartResType>("/cart");
      return response;
    },
  });

  // Mutation để thêm sản phẩm vào giỏ hàng
  const handleAddToCart = useMutation<AddToCartResType, Error, Product>({
    mutationFn: async (product: Product) => {
      const response = await apiClient.post<AddToCartBody, AddToCartResType>(
        "/cart/add",
        {
          product_id: product.id,
          quantity: 1,
        }
      );
      return response;
    },
    onSuccess: (data) => {
      // Dispatch action Redux để thêm sản phẩm vào giỏ hàng
      dispatch(
        addToCart({
          id: data.data.id, // ID của mục giỏ hàng
          cart_id: data.data.cart_id, // ID của giỏ hàng
          product_id: data.data.product_id, // ID của sản phẩm
          quantity: 1,
          product: data.data.product, // Thông tin chi tiết sản phẩm
        })
      );
      refetch(); // Refetch dữ liệu giỏ hàng
      Swal.fire({
        icon: "success",
        title: "Thêm vào giỏ hàng thành công!",
        text: `${data.data.product.name} đã được thêm vào giỏ hàng.`,
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

  // Mutation để xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = useMutation<
    RemoveFromCartResType,
    Error,
    string
  >({
    mutationFn: async (productId: string) => {
      const response = await apiClient.post<
        CartRemoveBody,
        RemoveFromCartResType
      >("/cart/remove", {
        product_id: productId,
      });
      return response;
    },
    onSuccess: (_, productId) => {
      // Dispatch action Redux để xóa sản phẩm khỏi giỏ hàng
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

  // Mutation để xóa toàn bộ giỏ hàng
  const handleClearCart = useMutation<ClearCartResType, Error>({
    mutationFn: async () => {
      const response = await apiClient.post<ClearCartBody, ClearCartResType>(
        "/cart/clear",
        {}
      );
      return response;
    },
    onSuccess: () => {
      // Dispatch action Redux để xóa toàn bộ giỏ hàng
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
    cartItems: cartData?.data.items || [], // Danh sách sản phẩm trong giỏ hàng
    isLoading, // Trạng thái loading
    handleAddToCart: handleAddToCart.mutate, // Hàm thêm sản phẩm
    handleRemoveFromCart: handleRemoveFromCart.mutate, // Hàm xóa sản phẩm
    handleClearCart: handleClearCart.mutate, // Hàm xóa toàn bộ giỏ hàng
  };
};
