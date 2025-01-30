
import { useState, useEffect } from "react";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { addToCompare, clearCompare, removeFromCompare } from "@/shared/state/compareSlice";
import { RootState } from "@/shared/state/store";

const STORAGE_KEY = "compare_products";

// Sử dụng biến global để quản lý trạng thái modal
let globalModalInstance: HTMLDivElement | null = null;

const useCompare = (maxCompare = 2) => {
  const dispatch = useDispatch();
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

  // Cleanup function để xóa modal khi component unmount
  useEffect(() => {
    return () => {
      if (globalModalInstance) {
        document.body.removeChild(globalModalInstance);
        globalModalInstance = null;
      }
    };
  }, []);

  const handleAddToCompare = (product: Product) => {
    if (
      selectedProducts.length < maxCompare &&
      !selectedProducts.some((p) => p.id === product.id)
    ) {
      dispatch(addToCompare(product));
      if (!globalModalInstance) {
        setIsModalOpen(true);
      }
    } else if (selectedProducts.length >= maxCompare) {
      alert(`You can only compare up to ${maxCompare} products.`);
    }
  };

  const handleRemoveFromCompare = (productId: string) => {
    dispatch(removeFromCompare(productId));
  };

  const handleClearCompare = () => {
    dispatch(clearCompare());
    setIsModalOpen(false);
    if (globalModalInstance) {
      document.body.removeChild(globalModalInstance);
      globalModalInstance = null;
    }
  };

  const navigateToComparePage = () => {
    const productIds = selectedProducts.map((product) => product.id).join(",");
    window.location.href = `/compare?product_ids=${productIds}`;
  };

  const CompareModal = () => {
    if (!isModalOpen) return null;

    // Tạo modal mới chỉ khi chưa có instance
    if (!globalModalInstance) {
      globalModalInstance = document.createElement("div");
      document.body.appendChild(globalModalInstance);
    }

    return (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          maxHeight: "400px",
          overflowY: "scroll",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 10px",
          zIndex: 9999,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h4 style={{ margin: 0 }}>Products Selected:</h4>
          <button
            onClick={() => {
              setIsModalOpen(false);
              if (globalModalInstance) {
                document.body.removeChild(globalModalInstance);
                globalModalInstance = null;
              }
            }}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <ul>
          {selectedProducts.map((product, index) => (
            <li key={index} style={{ display: "flex", alignItems: "center" }}>
              <Image
                src={product.images[0].image_url}
                alt={product.name}
                width={50}
                height={50}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                }}
              />
              <p>{product.name}</p>
              <button onClick={() => handleRemoveFromCompare(product.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        {selectedProducts.length === maxCompare ? (
          <p>Now you can compare them!</p>
        ) : (
          <p>Please select another product.</p>
        )}
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={navigateToComparePage}
            disabled={selectedProducts.length < 2}
          >
            Go to Compare Page
          </button>
          <button onClick={handleClearCompare} style={{ marginLeft: "10px" }}>
            Clear All
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