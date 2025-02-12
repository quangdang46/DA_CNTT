"use client";
import styles from "@/shared/components/ui/Admin/Transactions/transactions.module.css";

const TransactionsPage = () => {


  return (
    <div className={styles.containerPage}>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Trans ID</td>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
       
        </tbody>
      </table>

  
    </div>
  );
};

export default TransactionsPage;
