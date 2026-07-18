import { CharacterCard } from './CharacterCard';

export function CharacterGrid({ characters, onSelect }) {
  return (
    <section className="character-grid" aria-label="Listado de personajes">
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} onSelect={onSelect} />
      ))}
    </section>
  );
}
