export function SearchBar({ value, onChange }) {
  return (
    <label className="field field--search">
      <span>Buscar personaje</span>
      <div className="field__control">
        <span aria-hidden="true">⌕</span>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Ejemplo: Rick, Morty, Summer..."
          autoComplete="off"
        />
      </div>
    </label>
  );
}
