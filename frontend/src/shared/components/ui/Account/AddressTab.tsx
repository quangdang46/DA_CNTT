import { useTabs } from "@/shared/contexts/TabsContext";
import React, { useEffect, useRef, useState } from "react";
import styles from "@/shared/style/AddressTab.module.css";
import useClickOutside from "@/shared/hooks/useClickOutside";
import Check from "@/shared/components/icons/Check";
import CloseIcon from "@/shared/components/icons/CloseIcon";
export default function AddressTab() {
  const { activeTab } = useTabs();
  const [show, setShow] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null); // No need for `HTMLDivElement | null`
  useClickOutside(modalRef as React.RefObject<HTMLElement>, () =>
    setShow(false)
  );

  // Effect to manage body scroll
  useEffect(() => {
    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to remove the class on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [show]);

  return (
    <div
      className="woocommerce-MyAccount-content"
      style={
        activeTab === "account-address"
          ? { display: "block" }
          : { display: "none" }
      }
    >
      <div className="woocommerce-notices-wrapper"></div>
      <p>
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="u-columns woocommerce-Addresses col2-set addresses">
        <div className="u-column1 col-1 woocommerce-Address">
          <header
            className="woocommerce-Address-title title align-items-end"
            onClick={() => setShow(!show)}
          >
            <h2>Billing address</h2>
          </header>
          <address>You have not set up this type of address yet.</address>
        </div>
      </div>
      <div className=""></div>
      <div
        className={styles.address_overlay}
        style={{ display: show ? "block" : "none" }}
        onClick={() => setShow(false)} // Đóng modal khi click vào overlay
      ></div>

      <div
        className={styles.address_modal}
        style={{ display: show ? "block" : "none" }}
        ref={modalRef} // Tham chiếu modal
      >
        {/* <div className={`${styles.address_item} ${styles.address_item__right}`}>
          <div className={styles.top_location}>
            <b>Chọn địa chỉ nhận hàng</b>
            <p className={styles.full_location}>
              <span className={styles.choose_text}>Địa chỉ đang chọn: </span>
              <span className={styles.fulladdress}></span>
              <a className={styles.hide}>Thay đổi</a>
            </p>
            <a className={styles.cls_location}>
              <Check></Check>
            </a>
            <a className={styles.cls_back}>
              <Check></Check>
            </a>
          </div>
          <div className={styles.location_search}>
            <Check className={styles.icon_search}></Check>

            <input
              className=""
              id="locationSearch"
              name="locationSearch"
              placeholder="Tìm nhanh tỉnh thành, quận huyện, phường xã"
            />
            <a className={styles.clear_searchbox}>
              <span className={styles.box_relative}>
                <Check className={styles.close_symbol}></Check>
              </span>
            </a>
          </div>
        </div>

        <strong className={styles.choose_province}>
          <span>Hoặc chọn</span>
        </strong>

        <div className={styles.listing_location}>
          <div id={styles.suggest_location}></div>
          <div className={styles.lst_tab}>
            <a data-list="#lst-prov" className={styles.active}>
              Tỉnh/TP
            </a>
            <a data-list="#lst-dis" className={styles.disable}>
              Quận/Huyện
            </a>
            <a data-list="#lst-ward" className={styles.disable}>
              Phường/Xã
            </a>
          </div>
          <div id="lst-prov" className="lst-location">
            <div className="listing-locale">
              <ul>
                <li>
                  <a className="" data-value="3">
                    Hồ Chí Minh
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div id="lst-dis" className="lst-location hide"></div>
          <div id="lst-ward" className="lst-location hide"></div>
          <div id={styles.lst_address} className="lst-location hide">
            <input
              type="text"
              id="hdLocationAddress"
              name="hdLocationAddress"
              value=""
              placeholder="Số nhà, tên đường"
            />
            <span>
              Vui lòng cho Thế Giới Di Động biết số nhà, tên đường để thuận tiện
              giao hàng cho quý khách.
            </span>
            <label>Vui lòng nhập địa chỉ số nhà, tên đường để giao hàng.</label>
          </div>
        </div>

        <div className={styles.location_confirm}>
          <a>Xác nhận địa chỉ</a>
        </div>

        <div className={styles.location__none}>
          <i></i>
          <span>Không hiển thị lại, tôi sẽ cung cấp địa chỉ sau</span>
        </div> */}

        <div
          className={`${styles.address_location} `}
          style={{ display: show ? "block" : "none" }}
        >
          <a onClick={() => setShow(false)}>
            <CloseIcon></CloseIcon>
          </a>
          <b>Thông tin giao hàng</b>
          <ul>
            <li className="active">
              123 a, Phường 07, Quận 5, Hồ Chí Minh <i>Mặc định</i>
              <br />
              <a className="btn-edit">Chỉnh sửa</a>
            </li>
            <li
              className=""
              data-default="0"
              data-id="59801784"
              data-province="9"
              data-district="850"
              data-ward="1828"
              data-address="asasdsa"
            >
              asasdsa, Phường Hoà Cường Nam, Quận Hải Châu, Đà Nẵng
              <br />
              <a className="btn-edit">Chỉnh sửa</a>
              <a className="btn-delete">Xóa</a>
            </li>
          </ul>

          <a className={styles.btn_add}>Thêm thông tin địa chỉ giao hàng mới</a>
          <span className={styles.check} style={{ display: "none" }}>
            <i></i>Thêm địa chỉ giao hàng thành công
          </span>
          <a className={styles.btn_confirm}>Xác nhận</a>
          <div className={styles.la_delete} style={{ display: "none" }}>
            <div>
              <Check></Check>
              <b>Xóa địa chỉ</b>
              <span>Bạn có chắc chắn muốn xóa địa chỉ này không?</span>
              <a className="btn-delete-cancel">Hủy</a>
              <a className="btn-delete-confirm">Xóa</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
