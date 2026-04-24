# TP 8 : Consommer une API avec Fetch et Axios dans React

---

# Objectif

Dans ce TP, vous allez apprendre à :

- Consommer une API REST avec `fetch()`
- Consommer une API avec `axios`
- Gérer les états : loading, error, success
- Afficher des données dynamiques dans React

---

# Étape 1 – Préparer le projet

Si nécessaire :

```bash
npx create-react-app tp-api-react
cd tp-api-react
npm start
```

---

# Étape 2 – Installer Axios

```bash
npm install axios
```

---

# Étape 3 – Créer un composant avec `fetch()`

## Objectif

Ce composant va :

- Charger des articles depuis une API
- Afficher "Chargement..." pendant la requête
- Afficher une liste de titres

---

## Créer `FetchData.js`

Dans `src/`, créer le fichier :

```javascript
import { useState, useEffect } from 'react';

function FetchData() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      'https://jsonplaceholder.typicode.com/posts'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        return response.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p>Chargement en cours...</p>;

  if (error)
    return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>
        Articles chargés avec fetch()
      </h2>

      <ul>
        {posts
          .slice(0, 5)
          .map((post) => (
            <li key={post.id}>
              {post.title}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default FetchData;
```

---

## Explication

- `useEffect([])` → exécution une seule fois
- `fetch()` → appel API natif JavaScript
- `loading` → état de chargement
- `error` → gestion des erreurs
- `slice(0,5)` → afficher seulement 5 éléments

---

# Étape 4 – Créer un composant avec Axios

## Créer `AxiosData.js`

```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(
        'https://jsonplaceholder.typicode.com/users'
      )
      .then((response) =>
        setUsers(response.data)
      )
      .catch((err) =>
        setError(err.message)
      )
      .finally(() =>
        setLoading(false)
      );
  }, []);

  if (loading)
    return <p>Chargement en cours...</p>;

  if (error)
    return <p>Erreur : {error}</p>;

  return (
    <div>
      <h2>
        Utilisateurs chargés avec axios
      </h2>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} – {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AxiosData;
```

---

## Explication

- Axios simplifie les requêtes HTTP
- `response.data` contient directement les données
- Même logique : loading / error / success

---

# Étape 5 – Afficher les deux composants dans `App.js`

Remplacer `src/App.js` par :

```javascript
import FetchData from './FetchData';
import AxiosData from './AxiosData';

function App() {
  return (
    <div>
      <h1>
        TP – Consommer une API avec React
      </h1>

      <FetchData />

      <AxiosData />
    </div>
  );
}

export default App;
```

---

# Résultat attendu

L’application doit afficher :

✔ Une liste d’articles (fetch)  
✔ Une liste d’utilisateurs (axios)  
✔ Un message de chargement  
✔ Gestion des erreurs  

---

# Concepts appris

- `fetch()` API native
- `axios` (alternative moderne)
- `useEffect` pour les appels API
- `useState` pour gérer les données
- gestion des états asynchrones
  - loading
  - error
  - success

---

# Lancer le projet

```bash
npm start
```

---

# Bonus (bonnes pratiques)

✔ Toujours gérer `loading`  
✔ Toujours gérer `error`  
✔ Limiter les données affichées (`slice`)  
✔ Séparer les composants API  

---

# Fin du TP

Vous savez maintenant consommer des APIs REST dans React avec deux approches professionnelles :
- Fetch natif
- Axios