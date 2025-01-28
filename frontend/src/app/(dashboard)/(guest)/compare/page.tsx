// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CornerDownLeft, Star, StarHalf, X } from "lucide-react";
import WrapperContent from "@/shared/components/layouts/WrapperContent";
import React from "react";
import Image from "next/image";

export default function page() {
  return (
    <WrapperContent>
      <div
        id="post-467"
        className="post-467 page type-page status-publish hentry"
      >
        <div className="entry-content">
          {/* <div className="compare-empty">
            <h1 className="lead-title text-center cart-empty">
              No products were added to the compare table{" "}
            </h1>
            <p className="return-to-shop">
              <a
                className="button"
                href="https://techmarket.madrasthemes.com/shop/"
              >
                <CornerDownLeft></CornerDownLeft>
                Return To Shop{" "}
              </a>
            </p>
          </div> */}

          <div className="table-responsive">
            <table className="table table-compare compare-list">
              <tbody>
                <tr>
                  <th>Product</th>
                  <td>
                    <a className="product" href="single-product-fullwidth.html">
                      <div className="product-image">
                        <div className="image">
                          <Image
                            width={300}
                            height={300}
                            alt=""
                            className="attachment-shop_catalog size-shop_catalog wp-post-image"
                            src="https://images.unsplash.com/photo-1736779580644-6b4268af4642?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          />
                        </div>
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">
                          55EG9600 - 55-Inch 2160p Smart Curved Ultra HD 3D
                        </h3>
                        <div className="star-rating">
                          {Array(Math.floor(4.5))
                            .fill(0)
                            .map((_, i) => (
                              <Star strokeWidth={1} key={`full-${i}`} />
                            ))}

                          {4.5 % 1 !== 0 && (
                            <StarHalf strokeWidth={1} key="half-star" />
                          )}
                        </div>
                      </div>
                    </a>
                    {/* /.product */}
                  </td>
                  <td>
                    <a className="product" href="single-product-fullwidth.html">
                      <div className="product-image">
                        <div className="image">
                          <Image
                            width={300}
                            height={300}
                            alt=""
                            className="attachment-shop_catalog size-shop_catalog wp-post-image"
                            src="https://images.unsplash.com/photo-1736779580644-6b4268af4642?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          />
                        </div>
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">
                          55UP130 55-Inch 4K Ultra HD Roku Smart LED TV
                        </h3>
                      </div>
                    </a>
                    {/* /.product */}
                  </td>
                  <td>
                    <a className="product" href="single-product-fullwidth.html">
                      <div className="product-image">
                        <div className="image">
                          <Image
                            width={300}
                            height={300}
                            alt=""
                            className="attachment-shop_catalog size-shop_catalog wp-post-image"
                            src="https://images.unsplash.com/photo-1736779580644-6b4268af4642?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          />
                        </div>
                      </div>
                      <div className="product-info">
                        <h3 className="product-title">
                          55 KU6470 6 Series UHD Crystal Colour HDR Smart TV
                        </h3>
                      </div>
                    </a>
                    {/* /.product */}
                  </td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>
                    <div className="product-price price" />
                  </td>
                  <td>
                    <div className="product-price price">
                      <ins>
                        <span className="woocommerce-Price-amount amount">
                          <span className="woocommerce-Price-currencySymbol">
                            £
                          </span>
                          3,497.00
                        </span>
                      </ins>
                      <del>
                        <span className="woocommerce-Price-amount amount">
                          <span className="woocommerce-Price-currencySymbol">
                            £
                          </span>
                          4,239.99
                        </span>
                      </del>
                    </div>
                  </td>
                  <td>
                    <div className="product-price price">
                      <ins>
                        <span className="woocommerce-Price-amount amount">
                          <span className="woocommerce-Price-currencySymbol">
                            £
                          </span>
                          627.99
                        </span>
                      </ins>
                      <del>
                        <span className="woocommerce-Price-amount amount">
                          <span className="woocommerce-Price-currencySymbol">
                            £
                          </span>
                          939.99
                        </span>
                      </del>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Availability</th>
                  <td>
                    <span>In stock</span>
                  </td>
                  <td>
                    <span>In stock</span>
                  </td>
                  <td>
                    <span>In stock</span>
                  </td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>
                    <p>
                      3D Glasses Included, Built-In Speakers, DLNA Certified,
                      Game Mode, Headphone Jack, Internet Apps and Widgets,
                      Keyboard Controller Included, Smartphone controllable,
                      Wi-Fi Enabled.
                    </p>
                  </td>
                  <td>
                    <ul>
                      <li>
                        Refresh Rate: 60Hz (Native), 120Hz Clear Motion Index
                        (Effective)
                      </li>
                      <li>Backlight: LED (Full Array)</li>
                      <li>
                        Smart Functionality: Yes – Roku TV Streaming Platform
                        with built-in dual band Wi-Fi
                      </li>
                      <li>
                        Dimensions (W x H x D): TV without stand: 49″ x 28.4″ x
                        2.7″, TV with stand: 49″ x 30.2″ x 8.7”
                      </li>
                    </ul>
                  </td>
                  <td>
                    <p>
                      See stunningly natural and lifelike pictures through
                      Samsung’s UHD Crystal Colour technology meeting Digital
                      Europe and CEA UHD picture quality standards. This latest
                      screen technology delivers enhanced pixels and chip set
                      for a superior picture quality experience with stunning
                      contrast and over 17 million true to life colours with
                      intense shades in a colour space 20% wider than
                      conventional UHD.
                    </p>
                  </td>
                </tr>
                <tr>
                  <th>Add to cart</th>
                  <td>
                    <a className="button" href="cart.html">
                      Add to cart
                    </a>
                  </td>
                  <td>
                    <a className="button" href="cart.html">
                      Add to cart
                    </a>
                  </td>
                  <td>
                    <a className="button" href="cart.html">
                      Add to cart
                    </a>
                  </td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                  <td>
                    <span>-</span>
                  </td>
                </tr>
                <tr>
                  <th>Dimensions</th>
                  <td>
                    <span>N/A</span>
                  </td>
                  <td>
                    <span>N/A</span>
                  </td>
                  <td>
                    <span>N/A</span>
                  </td>
                </tr>
                <tr>
                  <th>Brand</th>
                  <td>&nbsp;</td>
                  <td>cannon</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>
                    <div className="product-price price">
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          $
                        </span>
                        239.99
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="product-price price">
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          $
                        </span>
                        239.99
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="product-price price">
                      <span className="woocommerce-Price-amount amount">
                        <span className="woocommerce-Price-currencySymbol">
                          $
                        </span>
                        349.00
                      </span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>&nbsp;</th>
                  <td className="text-center">
                    <a title="Remove" className="remove-icon" href="#">
                      <X />
                    </a>
                  </td>
                  <td className="text-center">
                    <a title="Remove" className="remove-icon" href="#">
                      <X />
                    </a>
                  </td>
                  <td className="text-center">
                    <a title="Remove" className="remove-icon" href="#">
                      <X />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* /.table-compare compare-list */}
          </div>
        </div>
      </div>
    </WrapperContent>
  );
}
