import React from "react";

export default function ShopControlBar() {
  return (
    <div className="shop-control-bar">
      <div className="handheld-sidebar-toggle">
        <button type="button" className="btn sidebar-toggler">
          <i className="fa fa-sliders" />
          <span>Filters</span>
        </button>
      </div>
      {/* .handheld-sidebar-toggle */}
      <h1 className="woocommerce-products-header__title page-title">Shop</h1>
      <ul role="tablist" className="shop-view-switcher nav nav-tabs">
        <li className="nav-item">
          <a
            href="#grid"
            title="Grid View"
            data-toggle="tab"
            className="nav-link"
          >
            <i className="tm tm-grid-small" />
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#grid-extended"
            title="Grid Extended View"
            data-toggle="tab"
            className="nav-link active"
          >
            <i className="tm tm-grid" />
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#list-view-large"
            title="List View Large"
            data-toggle="tab"
            className="nav-link "
          >
            <i className="tm tm-listing-large" />
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#list-view"
            title="List View"
            data-toggle="tab"
            className="nav-link "
          >
            <i className="tm tm-listing" />
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#list-view-small"
            title="List View Small"
            data-toggle="tab"
            className="nav-link "
          >
            <i className="tm tm-listing-small" />
          </a>
        </li>
      </ul>
      {/* .shop-view-switcher */}
      <form className="form-techmarket-wc-ppp" method="POST">
        <select className="techmarket-wc-wppp-select c-select" name="ppp">
          <option value={20}>Show 20</option>
          <option value={40}>Show 40</option>
          <option value={-1}>Show All</option>
        </select>
        <input type="hidden" defaultValue={5} name="shop_columns" />
        <input type="hidden" defaultValue={15} name="shop_per_page" />
        <input type="hidden" defaultValue="right-sidebar" name="shop_layout" />
      </form>
      {/* .form-techmarket-wc-ppp */}
      <form method="get" className="woocommerce-ordering">
        <select className="orderby" name="orderby">
          <option value="popularity">Sort by popularity</option>
          <option value="rating">Sort by average rating</option>
          <option selected={true} value="date">
            Sort by newness
          </option>
          <option value="price">Sort by price: low to high</option>
          <option value="price-desc">Sort by price: high to low</option>
        </select>
        <input type="hidden" defaultValue={5} name="shop_columns" />
        <input type="hidden" defaultValue={15} name="shop_per_page" />
        <input type="hidden" defaultValue="right-sidebar" name="shop_layout" />
      </form>
      {/* .woocommerce-ordering */}
      <nav className="techmarket-advanced-pagination">
        <form className="form-adv-pagination" method="post">
          <input
            type="number"
            defaultValue={1}
            className="form-control"
            step={1}
            max={5}
            min={1}
            size={2}
            id="goto-page"
          />
        </form>{" "}
        of 5
        <a href="#" className="next page-numbers">
          →
        </a>
      </nav>
      {/* .techmarket-advanced-pagination */}
    </div>
  );
}
