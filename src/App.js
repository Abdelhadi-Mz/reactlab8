import FetchData from './FetchData';
import AxiosData from './AxiosData';
import './App.css';

/**
 * App – point d'entrée du TP.
 * Compare fetch() natif (articles) et axios (utilisateurs) côte à côte.
 */
function App() {
  return (
    <div className="app">

      <header className="app-header">
        <h1>TP — Consommer une API avec React</h1>
        <p className="app-subtitle">fetch() natif &nbsp;·&nbsp; axios &nbsp;·&nbsp; gestion chargement / erreur</p>
      </header>

      {/* Tableau comparatif fetch vs axios */}
      <div className="compare-bar">
        <div className="compare-item">
          <strong>fetch()</strong> — natif, nécessite de vérifier <code>response.ok</code>
        </div>
        <div className="compare-sep">vs</div>
        <div className="compare-item">
          <strong>axios</strong> — bibliothèque, rejette automatiquement les erreurs HTTP
        </div>
      </div>

      <main className="app-main">
        {/* Étape 3 : fetch() */}
        <section className="section">
          <div className="section-label">Étape 3 — fetch()</div>
          <FetchData />
        </section>

        {/* Étape 4 : axios */}
        <section className="section">
          <div className="section-label">Étape 4 — axios</div>
          <AxiosData />
        </section>
      </main>

    </div>
  );
}

export default App;
