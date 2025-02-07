import Image from "next/image";
import styles from "@/shared/components/ui/Admin/Transactions/singleTransaction/singleTransaction.module.css";

const SingleTransactionPage = () => {
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
          <label>Username</label>
          <input type="text" name="username" placeholder="John Joe " />
          <label>Address</label>
          <input type="text" name="address" placeholder="New York" />
          <label>Phone</label>
          <input type="number" name="phone" placeholder="+12345" />
          <label>Email</label>
          <input type="text" name="email" placeholder="JohnJoe@gmail.com" />
          <label>Product Name</label>
          <input
            type="text"
            name="product name"
            placeholder="Iphone 16 Pro Max 256GB"
          />
          <label>Quantity</label>
          <textarea typeof="number" name="quantity" placeholder="2" />
          <label>Size</label>
          <select name="size" id="size">
            <option value="general">Choose a size</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
            <option value="1TB">1TB</option>
          </select>
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="Samsung">Samsung</option>
            <option value="Iphone">Iphone</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Oppo">Oppo</option>
          </select>
          <input type="text" placeholder="Color" name="color" />
          <input type="number" placeholder="amount" name="amount" />
          <label>Status</label>
          <select name="status" id="status">
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <label>Note</label>
          <textarea name="note" id="note" rows={16} placeholder="Note..." />
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleTransactionPage;
