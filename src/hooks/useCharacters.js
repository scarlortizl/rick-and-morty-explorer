import { useEffect, useState } from 'react';
import { getCharacters } from '../services/characterService';

const INITIAL_INFO = {
  count: 0,
  pages: 0,
  next: null,
  prev: null,
};

/**
 * Centraliza el estado y el ciclo de vida de la consulta de personajes.
 */
export function useCharacters({ page, name, status, requestVersion = 0 }) {
  const [characters, setCharacters] = useState([]);
  const [pageInfo, setPageInfo] = useState(INITIAL_INFO);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadCharacters() {
      setIsLoading(true);
      setError('');

      try {
        const data = await getCharacters({
          page,
          name,
          status,
          signal: controller.signal,
        });

        setCharacters(data.results);
        setPageInfo(data.info);
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setCharacters([]);
          setPageInfo(INITIAL_INFO);
          setError(
            'No fue posible cargar los personajes. Revisa tu conexión e inténtalo nuevamente.',
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadCharacters();

    return () => controller.abort();
  }, [page, name, status, requestVersion]);

  return {
    characters,
    pageInfo,
    isLoading,
    error,
  };
}
