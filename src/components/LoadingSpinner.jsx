export function LoadingSpinner() {
  return (
    <div className="state-message" role="status" aria-live="polite">
      <div className="portal-loader" aria-hidden="true" />
      <h2>Abriendo portal...</h2>
      <p>Consultando los registros de la API.</p>
    </div>
  );
}
