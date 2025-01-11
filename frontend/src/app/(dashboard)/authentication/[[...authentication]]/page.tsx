import Breadcrumb from "@/shared/components/ui/Breadcrumb";
import Login from "@/shared/components/ui/Login";
import Register from "@/shared/components/ui/Register";
import React from "react";

const page = () => {
  return (
    <div id="content" className="site-content">
      <div className="col-full">
        <div className="row">
          <Breadcrumb></Breadcrumb>

          <div id="primary" className="content-area">
            <main id="main" className="site-main">
              <div className="type-page hentry">
                <div className="entry-content">
                  <div className="woocommerce">
                    <div className="customer-login-form">
                      <span className="or-text">or</span>
                      <div id="customer_login" className="u-columns col2-set">
                        <Login></Login>
                        <Register></Register>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
