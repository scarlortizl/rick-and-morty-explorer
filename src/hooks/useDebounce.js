import { useEffect, useState } from 'react';

/**
 * Retrasa la actualización de un valor para evitar una petición HTTP
 * por cada tecla presionada en el buscador.
 */
export function useDebounce(value, delay = 450) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => window.clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
