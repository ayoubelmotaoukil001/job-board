# Job Board Full-Stack — Node.js / Express / MySQL / EJS

Application web full-stack dynamique permettant de consulter, filtrer, rechercher et trier des offres de stages et d'alternances dans le développement web.

---

## 1. Description du projet

Ce projet transforme la version initiale statique en une application Web dynamique basée sur Node.js, Express, MySQL et EJS. Les offres ne proviennent plus d'un fichier JSON, mais d'une base de données relationnelle MySQL modélisée et gérée via des requêtes SQL préparées.

---

## 2. Technologies utilisées

* **Backend** : Node.js, Express.js
* **Base de données** : MySQL, driver `mysql2/promise` (SQL brut avec requêtes préparées `?`)
* **Moteur de templates** : EJS avec partials réutilisables
* **Styling** : Tailwind CSS (CDN) et Vanilla CSS (`public/css/style.css`)
* **Persistance client** : LocalStorage (pour les offres suivies/favoris)

---

## 3. Prérequis

* Node.js (v18+)
* NPM
* Serveur MySQL en cours d'exécution (ex: via XAMPP, Docker, ou service local)

---

## 4. Configuration des variables d'environnement

Créer un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.example` :

```env
PORT=3000
DATABASE_URL=mysql://root:password@localhost:3306/jobboard
```

Remplacer `root`, `password`, `localhost`, `3306` et `jobboard` par vos accès MySQL.

---

## 5. Installation et Lancement

### Étape 1 : Installer les dépendances
```bash
npm install
```

### Étape 2 : Initialiser la base de données et charger les données de test
Cette commande crée les tables MySQL (`entreprise`, `technologie`, `offre`, `offre_technologie`) puis exécute le seeder JS :
```bash
npm run db:reset
```

Pour ré-exécuter uniquement le seeder sans re-créer les tables :
```bash
npm run db:seed
```

### Étape 3 : Démarrer le serveur

**Mode développement (avec rechargement automatique) :**
```bash
npm run dev
```

**Mode production :**
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`.

---

## 6. Architecture des dossiers

```text
job-board/
├── database/
│   ├── schema.sql              # Déclaration DDL des tables, PK, FK et contraintes
│   ├── seed.js                 # Seeder automatique (5 entreprises, 8 technologies, 12 offres)
│   └── reset.js                # Script de réinitialisation complète de la BDD
├── docs/                       # Documentation de conception (Diagrammes UML, MLD, Cahier des charges)
├── public/
│   └── css/
│       └── style.css           # Styles complémentaires CSS
├── src/
│   └── db.js                   # Pool de connexion MySQL (mysql2/promise)
├── views/                      # Vues EJS dynamiques
│   ├── partials/               # Partials (header, nav, footer)
│   ├── index.ejs               # Catalogue public avec filtres et tri
│   ├── offre-detail.ejs        # Fiche détail d'une offre
│   └── offres-suivies.ejs      # Offres enregistrées (localStorage)
├── .env.example                # Exemple de configuration d'environnement
├── package.json                # Scripts npm et dépendances
├── server.js                   # Point d'entrée principal de l'application Express
└── README.md                   # Documentation du projet
```

---

## 7. Routes de l'application

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/` | Liste des offres avec recherche, filtres (ville, contrat, technologie) et tri par date |
| `GET` | `/offres/:id` | Consultation détaillée d'une offre spécifique |
| `GET` | `/offres-suivies` | Page de consultation des offres sauvegardées dans `localStorage` |