import { useEffect } from 'react';
import { formatDate, getStatusData, translateGender } from '../utils/characterUtils';

export function CharacterModal({ character, onClose }) {
  useEffect(() => {
    if (!character) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [character, onClose]);

  if (!character) {
    return null;
  }

  const status = getStatusData(character.status);

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="modal-backdrop" onMouseDown={handleBackdropClick}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="character-modal-title"
      >
        <button type="button" className="modal__close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <img src={character.image} alt={`Retrato de ${character.name}`} className="modal__image" />

        <div className="modal__content">
          <p className="modal__eyebrow">EXPEDIENTE INTERDIMENSIONAL</p>
          <h2 id="character-modal-title">{character.name}</h2>

          <span className={`status-badge status-badge--${status.className}`}>
            <span className="status-badge__dot" aria-hidden="true" />
            {character.status} · {status.label}
          </span>

          <dl className="modal__details">
            <div>
              <dt>Especie</dt>
              <dd>{character.species}</dd>
            </div>
            <div>
              <dt>Género</dt>
              <dd>{translateGender(character.gender)}</dd>
            </div>
            <div>
              <dt>Tipo o variante</dt>
              <dd>{character.type || 'Sin clasificación adicional'}</dd>
            </div>
            <div>
              <dt>Origen</dt>
              <dd>{character.origin.name}</dd>
            </div>
            <div>
              <dt>Última ubicación conocida</dt>
              <dd>{character.location.name}</dd>
            </div>
            <div>
              <dt>Apariciones</dt>
              <dd>{character.episode.length} episodios</dd>
            </div>
            <div>
              <dt>Registro creado</dt>
              <dd>{formatDate(character.created)}</dd>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
}
