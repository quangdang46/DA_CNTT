import Logo from "@/shared/components/common/Logo";
import {
  BadgeJapaneseYen,
  HandCoins,
  Headset,
  MapPin,
  Send,
  Shield,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer footer-v1">
      <div className="col-full">
        <div className="before-footer-wrap">
          <div className="col-full">
            <div className="footer-newsletter">
              <div className="media">
                <Send strokeWidth={1} size={48} />
                <div className="media-body">
                  <div className="clearfix">
                    <div className="newsletter-header">
                      <h5 className="newsletter-title">
                        Sign up to Newsletter
                      </h5>
                      <span className="newsletter-marketing-text">
                        ...and receive{" "}
                        <strong>$20 coupon for first shopping</strong>
                      </span>
                    </div>
                    <div className="newsletter-body">
                      <div className="newsletter-form">
                        <input
                          type="text"
                          placeholder="Enter your email address"
                        />
                        <button className="button" type="button">
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-social-icons">
              <ul className="social-icons nav">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li className="nav-item" key={index}>
                    <Link className="sm-icon-label-link nav-link" href="#">
                      <HandCoins strokeWidth={1} /> Facebook
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-widgets-block">
          <div className="row">
            <div className="footer-contact" style={{ flex: "1" }}>
              <div className="footer-logo">
                <Link href={"/"} className="custom-logo-link" rel="home">
                  <Logo></Logo>
                </Link>
              </div>
              {/* .footer-logo */}
              <div className="contact-payment-wrap">
                <div className="footer-contact-info">
                  <div className="media">
                    <span className="media-left icon media-middle">
                      <Headset strokeWidth={1} size={48} />
                    </span>
                    <div className="media-body">
                      <span className="call-us-title">
                        Got Questions ? Call us 24/7!
                      </span>
                      <span className="call-us-text">
                        (800) 8001-8588, (0600) 874 548
                      </span>
                      <address className="footer-contact-address">
                        TDTU
                      </address>
                      <Link href={"#"} className="footer-address-map-link">
                        <MapPin strokeWidth={1} />
                        Find us on map
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="footer-payment-info">
                  <div className="media">
                    <span className="media-left icon media-middle">
                      <HandCoins strokeWidth={1} size={48}/>
                    </span>
                    <div className="media-body">
                      <h5 className="footer-payment-info-title">
                        We are using safe payments
                      </h5>
                      <div className="footer-payment-icons">
                        <ul className="list-payment-icons nav">
                          {Array.from({ length: 4 }).map((_, index) => (
                            <li className="nav-item" key={index}>
                              <BadgeJapaneseYen size={30} strokeWidth={1} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* .footer-payment-icons */}
                      <div className="footer-secure-by-info">
                        <h6 className="footer-secured-by-title">Secured by:</h6>
                        <ul className="footer-secured-by-icons">
                          <li className="nav-item">
                            <Shield size={48} strokeWidth={1} />
                          </li>
                          <li className="nav-item">
                            <Shield size={48} strokeWidth={1} />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* .contact-payment-wrap */}
            </div>
            <div className="footer-widgets">
              <div className="columns">
                <aside className="widget clearfix">
                  <div className="body">
                    <h4 className="widget-title">Find it Fast</h4>
                    <ul className="menu">
                      <li className="menu-item">
                        <Link href="shop.html">Computers &#038; Laptops</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">Cameras &#038; Photography</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">
                          Smart Phones &#038; Tablets
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">
                          Video Games &#038; Consoles
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">TV</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">Car Electronic &#038; GPS</Link>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>

              <div className="columns">
                <aside className="widget clearfix">
                  <div className="body">
                    <h4 className="widget-title">Find it Fast</h4>
                    <ul className="menu">
                      <li className="menu-item">
                        <Link href="shop.html">Computers &#038; Laptops</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">Cameras &#038; Photography</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">
                          Smart Phones &#038; Tablets
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">
                          Video Games &#038; Consoles
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">TV</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">Car Electronic &#038; GPS</Link>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>

              <div className="columns">
                <aside className="widget clearfix">
                  <div className="body">
                    <h4 className="widget-title">Find it Fast</h4>
                    <ul className="menu">
                      <li className="menu-item">
                        <Link href="shop.html">Computers &#038; Laptops</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">Cameras &#038; Photography</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">
                          Smart Phones &#038; Tablets
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">
                          Video Games &#038; Consoles
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">TV</Link>
                      </li>
                      <li className="menu-item">
                        <Link href="shop.html">Car Electronic &#038; GPS</Link>
                      </li>
                    </ul>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>

        <div className="site-info">
          <div className="col-full">
            <div className="copyright">
              Copyright &copy; 2017 <Link href="/home-v1">Techmarket</Link>{" "}
              Theme. All rights reserved.
            </div>
            <div className="credit">Made with love by bcube.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
