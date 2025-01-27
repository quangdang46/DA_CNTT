import Car from "@/shared/components/icons/Car";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <WrapperContent>
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
                <tr>
                  <td className="product-remove">
                    <div>
                      <a
                        title="Remove this product"
                        className="remove remove_from_wishlist"
                        href="#"
                      >
                        ×
                      </a>
                    </div>
                  </td>
                  <td className="product-thumbnail">
                    <a href="single-product-fullwidth.html">
                      <Image
                        width={180}
                        height={180}
                        alt=""
                        className="wp-post-image"
                        src="https://plus.unsplash.com/premium_photo-1736305817679-bd66c132847c?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      />
                    </a>
                  </td>
                  <td className="product-name">
                    <a href="single-product-fullwidth.html">
                      4K Action Cam with Wi-Fi &amp; GPS
                    </a>
                  </td>
                  <td className="product-price">
                    <ins>
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        199.95
                      </span>
                    </ins>
                    <del>
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        229.99
                      </span>
                    </del>
                  </td>
                  <td className="product-stock-status">
                    <span className="wishlist-in-stock">In Stock</span>
                  </td>
                  <td className="product-add-to-cart">
                    <a
                      className="button add_to_cart_button button alt"
                      href="cart.html"
                    >
                      Add to Cart
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="product-remove">
                    <div>
                      <a
                        title="Remove this product"
                        className="remove remove_from_wishlist"
                        href="#"
                      >
                        ×
                      </a>
                    </div>
                  </td>
                  <td className="product-thumbnail">
                    <a href="single-product-fullwidth.html">
                      <Image
                        width={180}
                        height={180}
                        alt=""
                        className="wp-post-image"
                        src="https://plus.unsplash.com/premium_photo-1736305817679-bd66c132847c?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      />
                    </a>
                  </td>
                  <td className="product-name">
                    <a href="single-product-fullwidth.html">
                      55EG9600 - 55-Inch 2160p Smart Curved Ultra HD 3D
                    </a>
                  </td>
                  <td className="product-price">
                    <ins>
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        199.95
                      </span>
                    </ins>
                    <del>
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        229.99
                      </span>
                    </del>
                  </td>
                  <td className="product-stock-status">
                    <span className="wishlist-in-stock">In Stock</span>
                  </td>
                  <td className="product-add-to-cart">
                    <a
                      className="button add_to_cart_button button alt"
                      href="cart.html"
                    >
                      Add to Cart
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="product-remove">
                    <div>
                      <a
                        title="Remove this product"
                        className="remove remove_from_wishlist"
                        href="#"
                      >
                        ×
                      </a>
                    </div>
                  </td>
                  <td className="product-thumbnail">
                    <a href="single-product-fullwidth.html">
                      <Image
                        width={180}
                        height={180}
                        alt=""
                        className="wp-post-image"
                        src="https://plus.unsplash.com/premium_photo-1736305817679-bd66c132847c?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      />
                    </a>
                  </td>
                  <td className="product-name">
                    <a href="single-product-fullwidth.html">
                      360° Viewing Immersive VR Headset
                    </a>
                  </td>
                  <td className="product-price">
                    <ins>
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        199.95
                      </span>
                    </ins>
                    <del>
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          £
                        </span>
                        229.99
                      </span>
                    </del>
                  </td>
                  <td className="product-stock-status">
                    <span className="wishlist-in-stock">In Stock</span>
                  </td>
                  <td className="product-add-to-cart">
                    <a
                      className="button add_to_cart_button button alt"
                      href="cart.html"
                    >
                      Add to Cart
                    </a>
                  </td>
                </tr>
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
                            <Car></Car>
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
  );
}
