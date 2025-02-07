import React from "react";
import styles from "./card.module.css";
import { CircleUser } from "lucide-react";

const Card = () => {
  return (
    <div className={styles.container}>
      <CircleUser size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total Users</span>
        <span className={styles.number}>10.273</span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span> more than previos week
        </span>
      </div>
    </div>
  );
};

export default Card;
