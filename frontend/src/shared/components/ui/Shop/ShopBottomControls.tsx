import React from 'react'

export default function ShopBottomControls() {
  return (
    <div className="shop-control-bar-bottom">
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
      <p className="woocommerce-result-count">Showing 1–15 of 73 results</p>
      {/* .woocommerce-result-count */}
      <nav className="woocommerce-pagination">
        <ul className="page-numbers">
          <li>
            <span className="page-numbers current">1</span>
          </li>
          <li>
            <a href="#" className="page-numbers">
              2
            </a>
          </li>
          <li>
            <a href="#" className="page-numbers">
              3
            </a>
          </li>
          <li>
            <a href="#" className="page-numbers">
              4
            </a>
          </li>
          <li>
            <a href="#" className="page-numbers">
              5
            </a>
          </li>
          <li>
            <a href="#" className="next page-numbers">
              →
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
