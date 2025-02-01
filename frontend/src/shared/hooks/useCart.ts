import {
  addToCart,
  clearCart,
  removeFromCart,
  selectTotalPrice,
  updateQuantity,
} from "@/shared/state/cartSlice";
import { AppDispatch, RootState } from "@/shared/state/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert2

// Hook để sử dụng dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook để sử dụng selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Custom hook cho giỏ hàng
export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalPrice = useAppSelector(selectTotalPrice); // Lấy tổng tiền

  // Hàm thêm sản phẩm vào giỏ hàng
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    Swal.fire({
      icon: "success",
      title: "Thêm vào giỏ hàng thành công!",
      text: `${product.name} đã được thêm vào giỏ hàng.`,
      timer: 2000, // Tự động đóng sau 2 giây
      showConfirmButton: false,
    });
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (id: string) => {
    Swal.fire({
      icon: "warning",
      title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      text: "Hành động này không thể hoàn tác!",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(id));
        Swal.fire({
          icon: "success",
          title: "Xóa sản phẩm thành công!",
          text: "Sản phẩm đã được xóa khỏi giỏ hàng.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  // Hàm cập nhật số lượng sản phẩm
  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
    Swal.fire({
      icon: "info",
      title: "Cập nhật số lượng thành công!",
      text: `Số lượng sản phẩm đã được cập nhật.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  // Hàm xóa toàn bộ giỏ hàng
  const handleClearCart = () => {
    Swal.fire({
      icon: "warning",
      title: "Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?",
      text: "Hành động này không thể hoàn tác!",
      showCancelButton: true,
      confirmButtonText: "Xóa tất cả",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire({
          icon: "success",
          title: "Xóa toàn bộ giỏ hàng thành công!",
          text: "Giỏ hàng của bạn đã được làm sạch.",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  return {
    cartItems,
    totalPrice,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart,
  };
};
