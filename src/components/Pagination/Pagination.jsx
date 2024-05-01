import React from "react";
import "../Pagination/pagination.style.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => onPageChange(1)}>
        First
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={number === currentPage ? "active" : ""}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;
