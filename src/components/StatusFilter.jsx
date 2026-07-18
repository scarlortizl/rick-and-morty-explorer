const STATUS_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'alive', label: 'Vivos' },
  { value: 'dead', label: 'Muertos' },
  { value: 'unknown', label: 'Desconocidos' },
];

export function StatusFilter({ value, onChange }) {
  return (
    <label className="field">
      <span>Estado</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value || 'all'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
