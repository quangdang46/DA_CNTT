import { ChangeEvent, useEffect, useState } from "react";
import styles from "./pagination.module.css";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const [inputPage, setInputPage] = useState<number | "">(currentPage);

  useEffect(() => {
    setInputPage(currentPage);
  }, [currentPage]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setInputPage("");
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 1 && numValue <= totalPages) {
        setInputPage(numValue);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputSubmit = (e: any) => {
    if (
      e.key === "Enter" &&
      typeof inputPage === "number" &&
      inputPage >= 1 &&
      inputPage <= totalPages
    ) {
      onPageChange(inputPage);
    }
  };
  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page{" "}
        <input
          type="text"
          value={inputPage}
          onChange={handleInputChange}
          onKeyDown={handleInputSubmit}
          className={styles.pageInput}
        />{" "}
        of {totalPages}
      </span>

      <button
        className={styles.button}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
