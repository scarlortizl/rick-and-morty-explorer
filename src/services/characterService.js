const API_URL = 'https://rickandmortyapi.com/api/character';

const EMPTY_RESPONSE = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};

/**
 * Consulta personajes utilizando los filtros soportados por la API.
 * La señal permite cancelar una petición anterior si el usuario cambia
 * rápidamente el buscador, el filtro o la página.
 */
export async function getCharacters({ page = 1, name = '', status = '', signal }) {
  const params = new URLSearchParams({ page: String(page) });

  if (name.trim()) {
    params.set('name', name.trim());
  }

  if (status) {
    params.set('status', status);
  }

  const response = await fetch(`${API_URL}?${params.toString()}`, { signal });

  // La API responde 404 cuando una búsqueda no tiene coincidencias.
  // En la interfaz es más útil interpretarlo como una lista vacía.
  if (response.status === 404) {
    return EMPTY_RESPONSE;
  }

  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`);
  }

  return response.json();
}
