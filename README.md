# Portail Stages & Alternances — Job Board Dynamique (Brief 2)

Application web interactive et dynamique permettant de consulter, filtrer, rechercher, trier et sauvegarder des offres de stages et d'alternances dans le développement web.

---

## 🚀 1. Lancement du Projet en Local

Le projet s'appuie sur les modules ES6 JavaScript (`type="module"`), il doit donc être lancé via un serveur local HTTP :

### Option A : VS Code Live Server
1. Ouvrir le dossier `job-board/` dans Visual Studio Code.
2. Faire un clic droit sur `index.html` -> **Open with Live Server**.

### Option B : Serveur Python
```bash
# Dans le dossier job-board/
python3 -m http.server 8000
```
Accéder à `http://localhost:8000` dans votre navigateur.

---

## 📁 2. Architecture des Fichiers

```text
job-board/
├── index.html            # Catalogue principal & filtres interactifs
├── offre-detail.html     # Fiche détaillée dynamique (?id=X)
├── offres-suivies.html   # Page dédiée aux favoris stockés dans localStorage
├── deposer-offre.html    # Formulaire de publication d'offre
├── admin.html            # Tableau de bord d'administration
├── data/
│   └── offers.json       # Dataset JSON (12+ offres de stage/alternance)
├── js/
│   ├── app.js            # Point d'entrée principal & écouteurs d'événements
│   ├── data.js           # Module d'accès aux données (fetch, async/await)
│   ├── filters.js        # Logique métier de filtrage combiné & tri
│   ├── render.js         # Rendu DOM dynamique (cartes, états loading/error/empty)
│   └── storage.js        # Gestion de la persistance dans localStorage
└── README.md             # Documentation du projet
```

---

## 💡 3. Fonctionnement Technique & Algorithmes

### A. Chargement Asynchrone des Données (`js/data.js`)
Les offres d'emploi sont stockées au format JSON dans `data/offers.json`. Le module `data.js` utilise la méthode native `fetch()` combinée aux mots-clés `async/await` pour charger les données sans bloquer l'interface.

### B. Combinaison des Filtres (`js/filters.js`)
La fonction `applyAllFilters(offers, filters)` combine plusieurs critères en une seule passe grâce à la méthode `.filter()` des tableaux JavaScript :
* **Recherche textuelle** : recherche insensible à la casse dans le titre, l'entreprise et la description courte.
* **Filtre Contrat** : sélection dynamique entre *Stage*, *Alternance* ou *Tous*.
* **Filtre Ville** : sélection par ville (Casablanca, Rabat, Tanger...).
* **Filtre Technologies** : vérification de la présence des compétences requises avec `.some()`.
* **Tri par date** : tri chronologique (*plus récents* / *plus anciens*) avec `.sort()` et comparaison de dates ISO.

### C. Persistance dans LocalStorage (`js/storage.js`)
La sauvegarde des offres suivies s'effectue sans backend via `localStorage` sous la clé `"followedOffers"` :
* Les identifiants des offres suivies sont sérialisés en JSON avec `JSON.stringify()` lors de la sauvegarde et désérialisés avec `JSON.parse()`.
* L'état visuel du bouton (*Suivre* / *Suivie*) est synchronisé en temps réel sur toutes les pages.
* La page `offres-suivies.html` filtre dynamiquement les offres à partir du tableau d'identifiants stockés.

---

## 🎯 4. Respect du Cahier des Charges (Brief 2)

- [x] Jeu de données JSON valide avec 12+ offres métier.
- [x] Chargement dynamique avec états de chargement, erreur et résultats vides.
- [x] Filtres combinables (technologie, ville, contrat, recherche textuelle, tri par date).
- [x] Compteur dynamique du nombre de résultats visibles.
- [x] Persistance des offres suivies via `localStorage`.
- [x] Page dédiée aux offres suivies avec option de retrait.
- [x] JavaScript natif ES6 propre (modules, `const`/`let`, pas de `var`, zéro erreur console).