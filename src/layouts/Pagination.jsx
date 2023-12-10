import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pagesToShow = 5; // Gösterilecek sayfa sayısı

  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let i = currentPage; i <= Math.min(currentPage + pagesToShow - 1, totalPages - 1); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination justify-content-center">
      <ul className="pagination">
        {currentPage > 0 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(0)}>İlk</button>
          </li>
        )}
        {currentPage > 0 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>Önceki</button>
          </li>
        )}
        {currentPage > 4 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(currentPage - 5)}>...</button>
          </li>
        )}
        {generatePageNumbers().map((i) => (
          <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(i)}>{i + 1}</button>
          </li>
        ))}
        {currentPage < totalPages - 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(currentPage + 5)}>...</button>
          </li>
        )}
        {currentPage < totalPages - 6 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>Sonraki</button>
          </li>
        )}
        {currentPage < totalPages - 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => onPageChange(totalPages - 1)}>Son</button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
