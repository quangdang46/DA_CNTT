import React from "react";
import styles from "./card.module.css";
interface Props {
  icon: React.ReactNode;
  title: string;
  number: string;
}
const Card = ({ icon, title, number }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.texts}>
        <span className={styles.title}>{title}</span>
        <span className={styles.number}>{number}</span>
      </div>
    </div>
  );
};

export default Card;
