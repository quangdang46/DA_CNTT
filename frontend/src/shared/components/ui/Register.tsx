import Tick from '@/shared/components/icons/Check';
import React from 'react'

export default function Register() {
  return (
    <div className="u-column2 col-2">
      <h2>Register</h2>
      <form className="register" method="post">
        <p className="before-register-text">
          Create new account today to reap the benefits of a personalized
          shopping experience. Praesent placerat, est sed aliquet finibus.
        </p>
        <p className="form-row form-row-wide">
          <label htmlFor="reg_email">
            Email address <span className="required">*</span>
          </label>
          <input
            type="email"
            value=""
            id="reg_email"
            name="email"
            className="woocommerce-Input woocommerce-Input--text input-text"
          />
        </p>
        <p className="form-row form-row-wide">
          <label htmlFor="reg_password">
            Password <span className="required">*</span>
          </label>
          <input
            type="password"
            id="reg_password"
            name="password"
            className="woocommerce-Input woocommerce-Input--text input-text"
          />
        </p>
        <p className="form-row">
          <input
            type="submit"
            className="woocommerce-Button button"
            name="register"
            value="Register"
          />
        </p>
        <div className="register-benefits">
          <h3>Sign up today and you will be able to :</h3>
          <ul>
            <li>
              <Tick></Tick> Speed your way through checkout
            </li>
            <li>
              <Tick></Tick> Track your orders easily
            </li>
            <li>
              <Tick></Tick> Keep a record of all your purchases
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
}
