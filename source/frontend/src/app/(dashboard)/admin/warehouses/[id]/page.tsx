import styles from "@/shared/components/ui/Admin/Warehouse/singleWarehouse/singleWarehouse.module.css";

import Image from "next/image";

const SingleWarehousePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src="https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            fill
          />
        </div>
        iPhone 16 Pro Max 256GB
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <label>Name Product</label>
          <input
            type="text"
            name="title"
            placeholder="iPhone 16 Pro Max 256GB "
          />
          <label>Supplier</label>
          <input type="text" name="supplier" placeholder="Apple Vietnam" />
          <label>Quantity</label>
          <input type="number" name="stock" placeholder="72" />
          <label>Date</label>
          <input type="date" name="date" id="date" />
          <label>Total Amount</label>
          <textarea typeof="text" name="total" />
          <label>Employee</label>
          <select name="employee" id="employee">
            <option value="general">Choose an employee</option>
            <option value="JohnJoe">John Joe</option>
          </select>
          <label>Description</label>
          <textarea
            name="desc"
            id="desc"
            rows={16}
            placeholder="Description..."
          />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleWarehousePage;
