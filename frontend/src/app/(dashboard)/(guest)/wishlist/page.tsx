"use client";
import wishlistApiRequest from "@/shared/apiRequests/wishlist";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import ProductRow from "@/shared/components/ui/Wishlist/ProductRow";
import { useWishlist } from "@/shared/hooks/useWishlist";
import { BadgeAlert } from "lucide-react";
import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import { toast } from "react-toastify";
export default function Page() {
  const { wishlist, toggleWishlist } = useWishlist();

  const { data } = wishlistApiRequest.useInfoWishlist(wishlist || []);

  const productRows = data?.data || [];
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
            <form className="woocommerce" method="post" action="#">
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
                      <div className="yith-wcwl-share">
                        <h4 className="yith-wcwl-share-title">Share on:</h4>
                        <ul>
                          <li
                            style={{
                              listStyleType: "none",
                              display: "inline-block",
                            }}
                          >
                            <a
                              title="Facebook"
                              href="https://www.facebook.com/sharer.php?s=100&p%5Btitle%5D=My+wishlist+on+Tech+Market&p%5Burl%5D=http%3A%2F%2Flocalhost%2F%7Efarook%2Ftechmarket%2Fhome-v1.html%2Fwishlist%2Fview%2FD5ON1PW1PYO1%2F"
                              className="facebook"
                              target="_blank"
                            >
                              <BadgeAlert strokeWidth={1} />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
              {/* .wishlist_table */}
            </form>
            {/* .woocommerce */}
          </div>
          {/* .entry-content */}
        </div>
      </WrapperContent>
    </>
  );
}
