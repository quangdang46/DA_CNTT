import styles from "@/shared/components/ui/Admin/Products/singleProduct/singleProduct.module.css";

import Image from "next/image";

const SingleProductPage = () => {
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
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="iPhone 16 Pro Max 256GB "
          />
          <label>Price</label>
          <input type="number" name="price" placeholder="999$" />
          <label>Stock</label>
          <input type="number" name="stock" placeholder="72" />

          <label>Color</label>
          <input type="text" name="color" placeholder="Black" />
          <label>Size</label>
          <textarea typeof="text" name="size" placeholder="XL" />
          <label>Cat</label>
          <select name="cat" id="cat">
            <option value="Samsung">Samsung</option>
            <option value="Iphone">Iphone</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Oppo">Oppo</option>
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

export default SingleProductPage;
