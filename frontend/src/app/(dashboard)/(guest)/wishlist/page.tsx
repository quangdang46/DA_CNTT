"use client";
import wishlistApiRequest from "@/shared/apiRequests/wishlist";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import Pagination from "@/shared/components/ui/Component/Pagination";
import ProductRow from "@/shared/components/ui/Wishlist/ProductRow";
import { useWishlist } from "@/shared/hooks/useWishlist";
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import { toast } from "react-toastify";
export default function Page() {
  const { wishlist, toggleWishlist } = useWishlist();
  const [page, setPage] = useState(1);
  const { data } = wishlistApiRequest.useInfoWishlist(wishlist, page, 3);

  const productRows = data?.data.data || [];
  const onSubmit = (id: string) => {
    confirmAlert({
      title: "Confirm Deletion",
      message:
        "Are you sure you want to delete this product? This action cannot be undone.",
      buttons: [
        {
          label: "Yes, Delete",
          onClick: () => {
            toggleWishlist(id);
            toast.success("Product with ID: " + id + " has been deleted.");
          },
        },
        {
          label: "No, Cancel",
          onClick: () => {
            toast.info("Product with ID: " + id + " has not been deleted.");
          },
        },
      ],
    });
  };
  return (
    <>
      <WrapperContent className="woocommerce-wishlist">
        <div className="type-page hentry">
          <header className="entry-header">
            <div className="page-header-caption">
              <h1 className="entry-title">Wishlist</h1>
            </div>
          </header>
          {/* .entry-header */}
          <div className="entry-content">
            <table className="shop_table cart wishlist_table">
              <thead>
                <tr>
                  <th className="product-remove" />
                  <th className="product-thumbnail" />
                  <th className="product-name">
                    <span className="nobr">Product Name</span>
                  </th>
                  <th className="product-price">
                    <span className="nobr"> Unit Price </span>
                  </th>
                  <th className="product-stock-status">
                    <span className="nobr"> Stock Status </span>
                  </th>
                  <th className="product-add-to-cart" />
                </tr>
              </thead>
              <tbody>
                {productRows.map((product, index) => (
                  <ProductRow
                    product={product}
                    onRemove={onSubmit}
                    key={index}
                  ></ProductRow>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>
                    <nav className="woocommerce-pagination">
                      {data?.data.current_page !== undefined &&
                        data?.data.last_page !== undefined && (
                          <Pagination
                            currentPage={data?.data.current_page}
                            totalPages={data?.data.last_page}
                            onPageChange={setPage}
                          />
                        )}
                    </nav>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </WrapperContent>
    </>
  );
}
