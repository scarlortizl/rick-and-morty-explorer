export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="state-message state-message--error" role="alert">
      <span className="state-message__icon" aria-hidden="true">!</span>
      <h2>La conexión interdimensional falló</h2>
      <p>{message}</p>
      <button type="button" className="button" onClick={onRetry}>
        Reintentar
      </button>
    </div>
  );
}
