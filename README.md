# Job Board — Stages & Alternances

Application web Full-Stack permettant la consultation, la recherche, le filtrage et la gestion administrative (CRUD) d'offres de stages et d'alternances dans le domaine du developpement web.

## Architecture

L'application repose sur une architecture Node.js / Express structurée avec le design pattern Repository :

- **Serveur & Routing** : Node.js avec Express.js (`server.js`).
- **Moteur de Vues** : EJS (Embedded JavaScript) avec composants réutilisables (`views/partials/`) et intégration du framework Tailwind CSS.
- **Base de Données** : MySQL via le driver `mysql2/promise` avec requêtes préparées (`?` placeholders).
- **Couche Repository** (`src/repositories/`) :
  - `entrepriseRepository.js` : Gestion des requêtes liées aux entreprises.
  - `technologieRepository.js` : Gestion des requêtes liées aux technologies.
  - `offreRepository.js` : Centralisation des requêtes SQL pour le catalogue, le filtrage et les opérations CRUD sur les offres.

## Structure de la Base de Données

- `entreprise` : `id`, `nom`, `logo`, `description`.
- `technologie` : `id`, `nom`.
- `offre` : `id`, `titre`, `description`, `ville`, `type_contrat`, `date_publication`, `entreprise_id`.
- `offre_technologie` : Table d'association Many-to-Many entre `offre` et `technologie`.

## Prérequis

- Node.js (version 18 ou supérieure)
- npm (Node Package Manager)
- Un serveur MySQL / MariaDB en cours d'exécution

## Installation et Configuration

1. **Cloner le projet et installer les dépendances** :
   ```bash
   npm install
   ```

2. **Configurer les variables d'environnement** :
   Créer un fichier `.env` à la racine du projet en s'inspirant du fichier `.env.example` :
   ```env
   PORT=3000
   DATABASE_URL=mysql://root:password@localhost:3306/job_board
   ```

3. **Initialiser la base de données** :
   Exécuter le script de réinitialisation et de seeding pour créer le schéma SQL et insérer les données de démonstration :
   ```bash
   npm run db:reset
   ```

4. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```
   L'application sera accessible à l'adresse : `http://localhost:3000`

## Liste des Routes

### Routes Publiques
- `GET /` : Catalogue public avec moteur de recherche, filtres (contrat, ville, technologie) et tri par date.
- `GET /offres/:id` : Page de détail d'une offre d'emploi.
- `GET /offres-suivies` : Page d'affichage des offres sauvegardées localement.

### Routes Administration (Back-Office)
- `GET /admin` : Tableau de bord listant l'ensemble des offres d'emploi avec actions.
- `GET /admin/offres/creer` : Formulaire de création d'une nouvelle offre.
- `POST /admin/offres` : Traitement de la création d'une offre et association des technologies.
- `GET /admin/offres/editer/:id` : Formulaire de modification d'une offre existante pré-remplie.
- `POST /admin/offres/editer/:id` : Traitement de la mise à jour d'une offre et synchronisation des technologies.
- `POST /admin/offres/supprimer/:id` : Traitement de la suppression définitive d'une offre.