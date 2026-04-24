import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * AxiosData – charge des utilisateurs avec Axios.
 *
 * Différences clés par rapport à fetch() :
 *   ✔ Axios rejette automatiquement les erreurs HTTP (4xx, 5xx)
 *   ✔ La réponse est dans response.data (pas besoin de .json())
 *   ✔ Syntaxe plus courte et lisible
 */
function AxiosData() {
  const [users, setUsers]     = useState([]);   // Utilisateurs récupérés
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError]     = useState(null); // Message d'erreur éventuel

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      // response.data contient directement le tableau JSON parsé
      .then((response) => setUsers(response.data))
      // Axios rejette la promesse pour tout statut >= 400 — pas besoin de vérifier response.ok
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []); // [] = une seule exécution au montage

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
        <span className="tech-badge axios">axios</span>
        <h2>Utilisateurs</h2>
        <span className="count">{users.length} résultats</span>
      </div>
      <ul className="item-list">
        {users.map((user) => (
          <li key={user.id} className="item user-item">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email">{user.email}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AxiosData;
