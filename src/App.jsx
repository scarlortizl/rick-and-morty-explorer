import { useCallback, useState } from 'react';
import './App.css';
import { CharacterGrid } from './components/CharacterGrid';
import { CharacterModal } from './components/CharacterModal';
import { EmptyState } from './components/EmptyState';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Pagination } from './components/Pagination';
import { SearchBar } from './components/SearchBar';
import { StatusFilter } from './components/StatusFilter';
import { useCharacters } from './hooks/useCharacters';
import { useDebounce } from './hooks/useDebounce';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm);

  const { characters, pageInfo, isLoading, error } = useCharacters({
    page: currentPage,
    name: debouncedSearchTerm,
    status: statusFilter,
    requestVersion,
  });

  function handleSearchChange(newValue) {
    setSearchTerm(newValue);
    setCurrentPage(1);
  }

  function handleStatusChange(newStatus) {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  }

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearFilters() {
    setSearchTerm('');
    setStatusFilter('');
    setCurrentPage(1);
  }

  const closeModal = useCallback(() => {
    setSelectedCharacter(null);
  }, []);

  const retryRequest = () => {
    setRequestVersion((previousVersion) => previousVersion + 1);
  };

  return (
    <>
      <Header />

      <main className="app-shell">
        <section className="control-panel" aria-label="Controles de búsqueda">
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          <StatusFilter value={statusFilter} onChange={handleStatusChange} />
        </section>

        <section className="results-heading">
          <div>
            <p className="results-heading__eyebrow">BASE DE DATOS</p>
            <h2>Personajes encontrados</h2>
          </div>
          {!isLoading && !error && (
            <p className="results-heading__count">
              <strong>{pageInfo.count}</strong> registros
            </p>
          )}
        </section>

        {isLoading && <LoadingSpinner />}

        {!isLoading && error && <ErrorMessage message={error} onRetry={retryRequest} />}

        {!isLoading && !error && characters.length === 0 && (
          <EmptyState onClear={clearFilters} />
        )}

        {!isLoading && !error && characters.length > 0 && (
          <>
            <CharacterGrid characters={characters} onSelect={setSelectedCharacter} />
            <Pagination
              currentPage={currentPage}
              totalPages={pageInfo.pages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <footer className="footer">
        <p>Desarrollado con React, Fetch API y la API pública de Rick and Morty.</p>
      </footer>

      <CharacterModal character={selectedCharacter} onClose={closeModal} />
    </>
  );
}
