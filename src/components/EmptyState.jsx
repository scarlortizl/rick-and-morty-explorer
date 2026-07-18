export function EmptyState({ onClear }) {
  return (
    <div className="state-message">
      <span className="state-message__icon" aria-hidden="true">?</span>
      <h2>No encontramos coincidencias</h2>
      <p>Prueba otro nombre o elimina el filtro de estado.</p>
      <button type="button" className="button" onClick={onClear}>
        Limpiar filtros
      </button>
    </div>
  );
}
