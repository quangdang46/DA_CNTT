import { useState } from "react";
import { Product } from "@/shared/types/ProductTypes";
import Image from "next/image";

const useCompare = (maxCompare = 2) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCompare = (product: Product) => {
    console.log("product", product);
    if (
      selectedProducts.length < maxCompare &&
      !selectedProducts.some((p) => p.id === product.id)
    ) {
      const updatedSelectedProducts = [...selectedProducts, product];
      setSelectedProducts(updatedSelectedProducts);
      setIsModalOpen(true);
    } else if (selectedProducts.length >= maxCompare) {
      alert(`You can only compare up to ${maxCompare} products.`);
    }
  };

  const handleRemoveFromCompare = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  const handleClearCompare = () => {
    setSelectedProducts([]);
    setIsModalOpen(false);
  };

  const navigateToComparePage = () => {
    const productIds = selectedProducts.map((product) => product.id).join(",");
    // Using window.location for client-side navigation
    window.location.href = `/compare?product_ids=${productIds}`;
  };

  const CompareModal = () => {
    if (!isModalOpen) return null;

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
        <h4>Products Selected:</h4>
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
