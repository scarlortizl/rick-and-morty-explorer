export function Header() {
  return (
    <header className="hero">
      <div className="hero__eyebrow">ARCHIVO INTERDIMENSIONAL</div>
      <h1>Rick & Morty Explorer</h1>
      <p>
        Busca habitantes del multiverso, filtra su estado y consulta su expediente completo.
      </p>
      <div className="hero__portal" aria-hidden="true">
        <span>R&M</span>
      </div>
    </header>
  );
}
