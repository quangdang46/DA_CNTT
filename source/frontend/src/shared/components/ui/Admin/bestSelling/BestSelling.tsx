import Link from "next/link";
import styles from "../bestSelling/bestSelling.module.css";
import Image from "next/image";

const bestproducts = [
  {
    id: 101,
    title: "iPhone 16 Pro Max 256GB",
    description: "100% new server, genuine Apple Vietnam",
    price: 1499,
    createdAt: "13.01.25",
    stock: 50,
  },
  {
    id: 102,
    title: "Samsung Galaxy S24 Ultra",
    description: "Latest Samsung flagship with 200MP camera and S Pen",
    price: 1399,
    createdAt: "20.01.25",
    stock: 30,
  },
  {
    id: 103,
    title: "Google Pixel 9 Pro",
    description: "Top-tier AI camera and clean Android experience",
    price: 999,
    createdAt: "15.12.24",
    stock: 25,
  },
  {
    id: 104,
    title: "Xiaomi Mi 14 Ultra",
    description:
      "Flagship killer with Leica camera system and great performance",
    price: 899,
    createdAt: "10.11.24",
    stock: 100,
  },
  {
    id: 105,
    title: "OnePlus 12",
    description: "Fast charging and excellent display performance",
    price: 799,
    createdAt: "01.12.24",
    stock: 70,
  },
];

const BestSellingPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Top 5 Selling Products</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>ID</td>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {bestproducts.map((product) => (
            <tr key={product.id}>
              <td>#{product.id}</td>
              <td>
                <div className={styles.product}>
                  <Image
                    src={
                      product.image ||
                      "https://plus.unsplash.com/premium_photo-1671209879721-40e4f468bee1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  <span className={styles.productTitle}>{product.title}</span>
                </div>
              </td>
              <td className={styles.productDescription}>
                {product.description}
              </td>
              <td>{Math.round(product.price)} VNĐ</td>
              <td>{product.createdAt}</td>
              <td>{product.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/admin/products/${product.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <button className={`${styles.button} ${styles.delete}`}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestSellingPage;
