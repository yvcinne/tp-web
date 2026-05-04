# Chapitre 6 : Le Protocole HTTP — Résultats des Travaux Pratiques


---

## TP 1 : Exploration avec les DevTools

### 1.2 Observer une requête simple

**URL testée :** `https://httpbin.org/get`

| Champ | Valeur |
|---|---|
| Code de statut | `200 OK` |
| Content-Type de la réponse | `application/json` |

**Headers de requête envoyés (exemples) :**

- `Host: httpbin.org`
- `User-Agent: Mozilla/5.0 ...`
- `Accept: text/html,application/xhtml+xml,...`
- `Accept-Language: fr-FR,fr;q=0.9`
- `Accept-Encoding: gzip, deflate, br`
- `Connection: keep-alive`

---

### 1.3 Tester différentes méthodes

**GET :**

```js
fetch('https://httpbin.org/get')
  .then(r => r.json())
  .then(console.log);
```

**POST :**

```js
fetch('https://httpbin.org/post', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John', age: 30 })
})
  .then(r => r.json())
  .then(console.log);
```

---

### 1.4 Observer les codes de statut

| URL | Code de statut |
|---|---|
| `httpbin.org/status/200` | `200 OK` |
| `httpbin.org/status/404` | `404 Not Found` |
| `httpbin.org/status/500` | `500 Internal Server Error` |
| `httpbin.org/redirect/3` | `302 Found` → redirige 3 fois → `200 OK` |

---

### Exercice — Tableau récapitulatif

| URL | Méthode | Code | Content-Type |
|---|---|---|---|
| `httpbin.org/get` | GET | `200` | `application/json` |
| `httpbin.org/post` | POST | `200` | `application/json` |
| `httpbin.org/status/201` | GET | `201` | `text/html; charset=utf-8` |

---

## TP 2 : Maîtrise de cURL

### 2.1 Requête GET simple

```bash
curl https://httpbin.org/get        # Requête basique
curl -i https://httpbin.org/get     # Avec headers de réponse
curl -v https://httpbin.org/get     # Mode verbose (debug)
```

**Différence entre `-i` et `-v` :**

| Option | Description |
|---|---|
| `-i` | Affiche uniquement les **headers HTTP de la réponse** suivis du corps |
| `-v` | Mode **verbose complet** : affiche les headers de requête ET de réponse, la négociation TLS, les infos de connexion — utile pour le débogage |

---

### 2.2 Requête POST avec données

```bash
# Form data
curl -X POST -d "name=John&email=john@example.com" \
  https://httpbin.org/post

# JSON
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}' \
  https://httpbin.org/post
```

---

### 2.3 Headers personnalisés

```bash
curl -H "Authorization: Bearer mon-token-secret" \
     -H "Accept: application/json" \
     https://httpbin.org/headers
```

---

### 2.4 Suivre les redirections

```bash
curl https://httpbin.org/redirect/3    # S'arrête à la 1ère redirection (302)
curl -L https://httpbin.org/redirect/3 # Suit toutes les redirections → 200 OK
```

---

### 2.5 Télécharger un fichier

```bash
curl -o image.png https://httpbin.org/image/png   # Nom personnalisé
curl -O https://example.com/fichier.pdf            # Nom original conservé
```

---

### Exercice avancé — Commande cURL complète

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Custom-Header: MonHeader" \
  -d '{"action": "test", "value": 42}' \
  -i \
  https://httpbin.org/post
```

> L'option `-i` permet d'afficher les **headers de réponse** en plus du corps.

---

## TP 3 : API REST avec JavaScript

### 3.1 GET basique

```js
// Avec .then()
fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => console.log(users))
  .catch(error => console.error('Erreur:', error));

// Avec async/await
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error('Erreur:', error);
  }
}
```

---

### 3.2 POST — Créer une ressource

```js
async function createPost(data) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}
```

---

### 3.3 PUT — Modifier une ressource

```js
async function updatePost(id, data) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
}
```

---

### 3.4 DELETE — Supprimer une ressource

```js
async function deletePost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'DELETE'
  });
  return response.ok;
}
```

---

### Exercice pratique — `fetchWithRetry`

```js
async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.status >= 500) {
        if (attempt === maxRetries) {
          throw new Error(`Échec après ${maxRetries} tentatives — HTTP ${response.status}`);
        }
        console.warn(`Tentative ${attempt} échouée (${response.status}), nouvel essai dans 1s...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        return response;
      }
    } catch (err) {
      if (attempt === maxRetries) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}
```

---

## TP 4 : Analyse des Headers de Sécurité

### 4.1 Vérifier les headers d'un site

```bash
# Voir tous les headers
curl -I https://google.com

# Filtrer les headers de sécurité
curl -s -D - https://github.com -o /dev/null | grep -i "strict\|x-frame\|x-content\|content-security"
```

---

### Headers de sécurité — Référence

| Header | But | Valeur recommandée |
|---|---|---|
| `Strict-Transport-Security` | Forcer HTTPS | `max-age=31536000; includeSubDomains` |
| `X-Frame-Options` | Anti-clickjacking | `DENY` ou `SAMEORIGIN` |
| `X-Content-Type-Options` | Anti-MIME sniffing | `nosniff` |
| `Content-Security-Policy` | Sources autorisées | `default-src 'self'` |
| `Referrer-Policy` | Contrôle du referrer | `strict-origin-when-cross-origin` |

---

### Exercice — Analyse de 3 sites

| Site | HSTS | X-Frame-Options | CSP | Note |
|---|---|---|---|---|
| `github.com` | ✅ `max-age=31536000; includeSubDomains; preload` | ✅ `deny` | ✅ Présent (strict) | A+ |
| `google.com` | ✅ `max-age=10886400` | ❌ Absent | ⚠️ Partiel | B |
| `wikipedia.org` | ✅ `max-age=106384710` | ✅ `SAMEORIGIN` | ⚠️ Partiel | B+ |

> Les notes sont basées sur l'analyse via [securityheaders.com](https://securityheaders.com).

---

## TP 5 : Cache HTTP

### 5.1 Observer le cache

```bash
curl -i https://httpbin.org/cache/60
# Headers attendus : Cache-Control, ETag, Expires
```

---

### 5.2 Requête conditionnelle (ETag)

```bash
# Obtenir l'ETag
curl -i https://httpbin.org/etag/test123

# Requête conditionnelle avec If-None-Match
curl -i -H "If-None-Match: test123" https://httpbin.org/etag/test123
# → Réponse attendue : 304 Not Modified
```

---

### 5.3 Observation dans le navigateur

| Action | Résultat observé |
|---|---|
| Premier chargement | Requête réseau normale — `200 OK` |
| Rechargement (F5) | `(from cache)` ou `304 Not Modified` |
| Rechargement forcé (Ctrl+Shift+R) | Ignorance du cache — nouvelle requête réseau |

---

## Exercices Récapitulatifs

### Exercice 2 — Questions théoriques

**1. Quelle est la différence entre `no-cache` et `no-store` ?**

`no-cache` signifie que le navigateur peut stocker la réponse en cache, mais doit **valider auprès du serveur** avant de la réutiliser (via ETag ou Last-Modified). `no-store` interdit toute mise en cache : la réponse ne doit être ni stockée ni réutilisée, ce qui est adapté aux données sensibles.

---

**2. Pourquoi POST n'est-il pas idempotent ?**

Envoyer plusieurs fois la même requête POST peut créer plusieurs ressources distinctes (ex : plusieurs commandes, plusieurs entrées en base). Une requête est idempotente si son exécution répétée produit le même résultat — ce qui n'est pas le cas de POST. En revanche, PUT et DELETE sont idempotents.

---

**3. Que se passe-t-il si le serveur renvoie un code 301 ?**

`301 Moved Permanently` indique que la ressource a changé d'URL de façon permanente. Le navigateur redirige automatiquement vers la nouvelle URL et, à l'avenir, utilise directement cette nouvelle URL sans repasser par l'ancienne. Les moteurs de recherche transfèrent également le « PageRank » vers la nouvelle URL.

---

**4. À quoi sert le header `Origin` ?**

Le header `Origin` indique l'origine (schéma + domaine + port) de la requête. Il est utilisé par le mécanisme **CORS** (Cross-Origin Resource Sharing) pour permettre au serveur de décider s'il autorise les requêtes provenant d'un domaine différent. Le serveur répond avec `Access-Control-Allow-Origin` pour accorder ou refuser l'accès.

---

**5. Pourquoi utiliser `HttpOnly` sur les cookies de session ?**

L'attribut `HttpOnly` empêche JavaScript d'accéder au cookie via `document.cookie`. Cela protège contre les attaques **XSS** (Cross-Site Scripting) : même si un attaquant injecte du code JavaScript malveillant, il ne peut pas voler le cookie de session et usurper l'identité de l'utilisateur.

---

