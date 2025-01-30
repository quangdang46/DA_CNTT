import React from "react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ul className="page-numbers">
      {currentPage > 1 && (
        <li>
          <div
            className="prev page-numbers"
            onClick={() => onPageChange(currentPage - 1)}
          >
            ←
          </div>
        </li>
      )}

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <li key={page}>
            <div
              className={`page-numbers ${
                page === currentPage ? "current" : ""
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </div>
          </li>
        );
      })}

      {currentPage < totalPages && (
        <li>
          <div
            className="next page-numbers"
            onClick={() => onPageChange(currentPage + 1)}
          >
            →
          </div>
        </li>
      )}
    </ul>
  );
}
