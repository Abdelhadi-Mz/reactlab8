import { useState, useEffect } from 'react';

/**
 * FetchData – charge des articles depuis une API publique avec fetch() natif.
 *
 * Trois états gérés :
 *   loading → true pendant la requête, false à la fin
 *   posts   → tableau rempli une fois les données reçues
 *   error   → message d'erreur si la requête échoue
 */
function FetchData() {
  const [posts, setPosts]     = useState([]);   // Articles récupérés
  const [loading, setLoading] = useState(true); // Affiche le spinner
  const [error, setError]     = useState(null); // Message d'erreur éventuel

  useEffect(() => {
    // [] en dépendance = s'exécute UNE seule fois, au montage du composant
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        // fetch() ne rejette PAS la promesse sur les erreurs HTTP (404, 500…)
        // il faut vérifier response.ok manuellement
        if (!response.ok) throw new Error(`Erreur réseau : ${response.status}`);
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false)); // Toujours exécuté, succès ou échec
  }, []);

  // Rendu conditionnel selon l'état courant
  if (loading) {
    return (
      <div className="status-box loading">
        <span className="spinner" aria-hidden="true" />
        Chargement en cours…
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-box error">
        ❌ Erreur : {error}
      </div>
    );
  }

  return (
    <div className="data-card">
      <div className="data-card-header">
        <span className="tech-badge fetch">fetch()</span>
        <h2>Articles</h2>
        <span className="count">{posts.length} résultats — 5 affichés</span>
      </div>
      <ul className="item-list">
        {/* slice(0, 5) : on limite l'affichage pour ne pas surcharger la page */}
        {posts.slice(0, 5).map((post) => (
          <li key={post.id} className="item">
            <span className="item-id">#{post.id}</span>
            <span className="item-text">{post.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FetchData;
