export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="pagination" aria-label="Paginación de personajes">
      <button
        type="button"
        className="button button--secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Anterior
      </button>

      <p>
        Página <strong>{currentPage}</strong> de <strong>{totalPages}</strong>
      </p>

      <button
        type="button"
        className="button button--secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente →
      </button>
    </nav>
  );
}
