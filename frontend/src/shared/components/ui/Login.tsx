import React from 'react'

export default function Login() {
  return (
    <div className="u-column1 col-1">
      <h2>Login</h2>
      <form
        method="post"
        className="woocomerce-form woocommerce-form-login login"
      >
        <p className="before-login-text">
          Vestibulum lacus magna, faucibus vitae dui eget, aliquam fringilla. In
          et commodo elit. Class aptent taciti sociosqu ad litora.
        </p>
        <p className="form-row form-row-wide">
          <label htmlFor="username">
            Username or email address <span className="required">*</span>
          </label>
          <input
            type="text"
            className="input-text"
            name="username"
            id="username"
          />
        </p>
        <p className="form-row form-row-wide">
          <label htmlFor="password">
            Password <span className="required">*</span>
          </label>
          <input
            className="input-text"
            type="password"
            name="password"
            id="password"
          />
        </p>
        <p className="form-row">
          <input
            className="woocommerce-Button button"
            type="submit"
            value="Login"
            name="login"
          />
          <label
            htmlFor="rememberme"
            className="woocommerce-form__label woocommerce-form__label-for-checkbox inline"
          >
            <input
              className="woocommerce-form__input woocommerce-form__input-checkbox"
              name="rememberme"
              type="checkbox"
              id="rememberme"
              value="forever"
            />
            Remember me
          </label>
        </p>
        <p className="woocommerce-LostPassword lost_password">
          <a href="#">Lost your password?</a>
        </p>
      </form>
    </div>
  );
}
