import { useState, useEffect } from "react";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCompare,
  clearCompare,
  removeFromCompare,
} from "@/shared/state/compareSlice";
import { RootState } from "@/shared/state/store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "compare_products";

const useCompare = (maxCompare = 3) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedProducts = useSelector(
    (state: RootState) => state.compare.selectedProducts
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEY);
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        parsed.forEach((product: Product) => dispatch(addToCompare(product)));
      } catch (error) {
        console.error("Error parsing saved products:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedProducts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedProducts));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [selectedProducts]);

  const handleAddToCompare = (product: Product) => {
    if (
      selectedProducts.length < maxCompare &&
      !selectedProducts.some((p) => p.id === product.id)
    ) {
      dispatch(addToCompare(product));
      Swal.fire({
        icon: "success",
        title: "Đã thêm vào so sánh",
        text: `${product.name} đã được thêm vào danh sách so sánh.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (selectedProducts.length >= maxCompare) {
      // Hiển thị SweetAlert2 thông báo lỗi
      Swal.fire({
        icon: "warning",
        title: "Đạt giới hạn",
        text: `Bạn chỉ có thể so sánh tối đa ${maxCompare} sản phẩm.`,
        showConfirmButton: true,
      });
    }

    // Luôn hiển thị modal khi bấm "Compare"
    setIsModalOpen(true);
  };

  const handleRemoveFromCompare = (productId: string) => {
    dispatch(removeFromCompare(productId));
    Swal.fire({
      icon: "success",
      title: "Đã xóa khỏi so sánh",
      text: "Sản phẩm đã được xóa khỏi danh sách so sánh.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleClearCompare = () => {
    dispatch(clearCompare());
    setIsModalOpen(false);
    Swal.fire({
      icon: "success",
      title: "Đã xóa tất cả",
      text: "Tất cả sản phẩm đã được xóa khỏi danh sách so sánh.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const navigateToComparePage = () => {
    const productIds = selectedProducts.map((product) => product.id).join(",");
    // window.location.href = `/compare?ids=${productIds}`;
    router.push(`/compare?ids=${productIds}`);
  };

  const CompareModal = () => {
    if (!isModalOpen) return null;

    return (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          zIndex: 9999,
          width: "320px",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        {/* Tiêu đề */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h4 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
            So sánh sản phẩm
          </h4>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ×
          </button>
        </div>

        {/* Danh sách sản phẩm */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {selectedProducts.map((product, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
                padding: "8px",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Image
                src={product.images[0].image_url}
                alt={product.name}
                width={50}
                height={50}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "8px",
                  marginRight: "12px",
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: "500" }}>
                  {product.name}
                </p>
              </div>
              <button
                onClick={() => handleRemoveFromCompare(product.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ff4d4f",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Xóa
              </button>
            </li>
          ))}
        </ul>

        {/* Thông báo khi đạt giới hạn */}
        {selectedProducts.length >= maxCompare && (
          <p
            style={{ color: "#ff4d4f", fontSize: "14px", textAlign: "center" }}
          >
            Bạn chỉ có thể so sánh tối đa {maxCompare} sản phẩm.
          </p>
        )}

        {/* Nút hành động */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <button
            onClick={handleClearCompare}
            style={{
              background: "#ff4d4f",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Xóa tất cả
          </button>
          <button
            onClick={navigateToComparePage}
            disabled={selectedProducts.length < 2}
            style={{
              background: selectedProducts.length >= 2 ? "#1890ff" : "#ccc",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: selectedProducts.length >= 2 ? "pointer" : "not-allowed",
              fontSize: "14px",
            }}
          >
            So sánh ngay
          </button>
        </div>
      </div>
    );
  };

  return {
    selectedProducts,
    handleAddToCompare,
    handleRemoveFromCompare,
    handleClearCompare,
    CompareModal,
    isModalOpen,
  };
};

export default useCompare;
