import { getStatusData, translateGender } from '../utils/characterUtils';

export function CharacterCard({ character, onSelect }) {
  const status = getStatusData(character.status);

  return (
    <article className="character-card">
      <div className="character-card__image-wrapper">
        <img
          src={character.image}
          alt={`Retrato de ${character.name}`}
          className="character-card__image"
          loading="lazy"
        />
        <span className={`status-badge status-badge--${status.className}`}>
          <span className="status-badge__dot" aria-hidden="true" />
          {character.status} · {status.label}
        </span>
      </div>

      <div className="character-card__content">
        <p className="character-card__id">REGISTRO #{String(character.id).padStart(3, '0')}</p>
        <h2>{character.name}</h2>

        <dl className="character-card__facts">
          <div>
            <dt>Especie</dt>
            <dd>{character.species}</dd>
          </div>
          <div>
            <dt>Género</dt>
            <dd>{translateGender(character.gender)}</dd>
          </div>
        </dl>

        <button type="button" className="button button--card" onClick={() => onSelect(character)}>
          Abrir expediente
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
