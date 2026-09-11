# Analyse du Cahier des Charges — Portail Stages & Alternances

## 1. Synthèse du Projet
Le projet consiste à développer un portail web interne dédié à la promotion MERN (2026/2027) afin de centraliser, consulter et gérer les offres de stages et d'alternances dans le domaine du développement web et de la tech.

## 2. Publics Cibles & Personas
- **Apprenant / Recherche de stage** : Souhaite trouver rapidement une opportunité adaptée à ses compétences (ex: React, Node, PHP), sauvegarder ses offres préférées et y postuler.
- **Visiteur** : Souhaite découvrir la liste des opportunités et le type de postes proposés par le portail.
- **Administrateur / Gestionnaire** : Souhaite publier de nouvelles annonces, modifier ou supprimer des offres obsolètes sans gestion complexe de comptes.

## 3. Matrice des Fonctionnalités (Périmètre V1)
| Fonctionnalité | Description | Priorité (Agile) |
|---|---|---|
| Catalogue & Recherche | Consultation de la liste des offres avec filtres (Contrat, Ville, Techno) et recherche par mot-clé. | Must Have |
| Fiche Détail Offre | Page complète affichant les détails de la mission, le profil recherché et les informations de candidature. | Must Have |
| Gestion des Favoris | Sauvegarde locale des offres suivies (LocalStorage / navigateur) et page dédiée. | Must Have |
| Dépôt d'Annonce | Formulaire complet de soumission d'offres de stage ou d'alternance. | Must Have |
| Administration CRUD | Interface de gestion simple (Tableau de bord, modification, confirmation de suppression). | Must Have |

## 4. Règles de Gestion & Données Métier
- Une offre comporte un titre, un type (`Stage` ou `Alternance`), une ville, une date de publication, une entreprise, des technologies et un contact.
- Les offres suivies sont stockées au niveau du navigateur de l'utilisateur.
- Pas de système d'authentification ou de compte utilisateur complexe dans cette phase statique V1.
