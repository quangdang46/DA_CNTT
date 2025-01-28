import WrapperContent from "@/shared/components/layouts/WrapperContent";
import React from "react";

export default function page() {
  return (
    <WrapperContent>
      <div className="error404">
        <div className="info-404">
          <h2 className="title">404!</h2>
          <p className="lead error-text">Oops! That page can’t be found.</p>
          <p className="lead">
            Nothing was found at this location. Try searching, or check out the
            links below.
          </p>
          <div className="sub-form-row">
            <div className="widget woocommerce widget_product_search">
              <form className="search-form">
                <input type="text" placeholder="Search products..." />
                <button className="button" type="button">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* .sub-form-row */}
      </div>
    </WrapperContent>
  );
}
