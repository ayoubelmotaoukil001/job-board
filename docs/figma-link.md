## 4. Liens du Projet Figma
- **Fichier Figma (Design & Inspect)** : [Consulter le projet Figma](https://www.figma.com/design/54XB3jdk2hk7FMYlSnqno3/Untitled?node-id=0-1&t=yXWLnk8BoJ3JXeHC-1)
- **Permissions** : Accès configuré en lecture / inspection (Viewer avec Dev Mode activé).

## 5. Organisation des Frames & Traçabilité des User Stories

Chaque écran est décliné en deux résolutions standard (**Desktop 1440px** et **Mobile 375px**) pour valider les exigences de responsive design du brief :

| Écran / Page | Frame Desktop (1440px) | Frame Mobile (375px) | User Stories associées (Backlog Jira) |
| :--- | :--- | :--- | :--- |
| **Catalogue d'offres** (`index.html`) | `01_Catalog_Desktop` | `01_Catalog_Mobile` | **JB-8** (Affichage liste), **JB-9** (Recherche mots-clés), **JB-10** (Filtres), **JB-11** (Tri) |
| **Fiche Détail** (`offre-detail.html`) | `02_Detail_Desktop` | `02_Detail_Mobile` | **JB-7** (Consultation du détail d'une offre) |
| **Offres Suivies** (`offres-suivies.html`) | `03_SavedOffers_Desktop` | `03_SavedOffers_Mobile` | **JB-12** (Mise en favori), **JB-13** (Gestion et consultation des offres suivies) |
| **Espace Administration** (`admin.html`) | `04_Admin_Desktop` | `04_Admin_Mobile` | **JB-17** (Catalogue admin), **JB-18** (Création), **JB-19** (Modification), **JB-20** (Suppression avec confirmation) |

## 6. Conception & Spécifications Techniques
- Structure low-fidelity basée sur des contraintes Flexbox et CSS Grid directement transposables en HTML5/CSS.
- Utilisation de contraintes Auto Layout pour garantir l'adaptabilité Desktop (1440px) et Mobile (375px).
- Respect d'un système d'espacement standardisé (multiples de 8px) et hiérarchie visuelle sans éléments superflus.