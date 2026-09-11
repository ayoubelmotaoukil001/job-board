# Backlog Jira & Découpage Agile — Stages & Alternances

## 1. Epics du Projet
1. **EPIC 1 : Consultation des offres & Navigation**
2. **EPIC 2 : Recherche, Filtres & Tri**
3. **EPIC 3 : Suivi & Sauvegarde des offres**
4. **EPIC 4 : Publication & Dépôt d'offre**
5. **EPIC 5 : Administration & Back-Office minimal**

---

## 2. Découpage des User Stories par Epic

### EPIC 1 : Consultation des offres & Navigation

#### JB-8 : Affichage de la liste des offres
- **En tant qu'** apprenant ou visiteur,
- **Je veux** visualiser l'ensemble des offres de stage et d'alternance sous forme de cartes claires,
- **Afin d'** identifier rapidement les opportunités d'emploi disponibles.
- **Critères d'acceptation** :
  - Chaque carte affiche le titre du poste, l'entreprise, la localisation, le type de contrat (Stage/Alternance) et la date de publication.
  - La disposition est responsive (2 colonnes sur desktop, 1 colonne sur mobile).

#### JB-7 : Consultation de la fiche détail d'une offre
- **En tant qu'** apprenant ou candidat,
- **Je veux** cliquer sur une offre pour accéder à sa fiche descriptive complète,
- **Afin de** consulter les détails de la mission, les compétences requises et les coordonnées pour postuler.
- **Critères d'acceptation** :
  - Affichage complet du descriptif, des prérequis techniques, du profil recherché et des modalités de contact.
  - Présence d'un lien de retour vers le catalogue global.

---

### EPIC 2 : Recherche, Filtres & Tri

#### JB-9 : Recherche textuelle par mots-clés
- **En tant qu'** apprenant,
- **Je veux** saisir des termes dans une barre de recherche,
- **Afin de** trouver rapidement les offres correspondant à un mot-clé précis ou à une entreprise.
- **Critères d'acceptation** :
  - Champ de saisie actif filtrant les offres de manière fluide.
  - Actualisation dynamique des annonces affichées.

#### JB-10 : Filtrage multicritères des offres
- **En tant qu'** apprenant,
- **Je veux** filtrer la liste par type de contrat, ville et technologie,
- **Afin de** cibler les opportunités adaptées à mon profil et à ma zone géographique.
- **Critères d'acceptation** :
  - Mise à disposition de listes déroulantes indépendantes et cumulables.
  - Compteur visible indiquant le nombre d'offres répondant aux critères.

#### JB-11 : Tri des offres par date de publication
- **En tant qu'** apprenant,
- **Je veux** réorganiser l'affichage des annonces selon leur date d'ajout,
- **Afin de** prioriser la lecture des offres les plus récentes.
- **Critères d'acceptation** :
  - Sélecteur de tri réordonnant l'ordre des cartes à l'écran.

---

### EPIC 3 : Suivi & Sauvegarde des offres

#### JB-12 : Mise en favori et suivi d'une offre
- **En tant qu'** apprenant,
- **Je veux** marquer une offre comme "Suivie" depuis sa carte ou sa fiche descriptive,
- **Afin de** la retrouver aisément pour préparer mes candidatures.
- **Critères d'acceptation** :
  - Changement d'état visuel du bouton d'action lors de l'activation.
  - Mise à jour en temps réel du badge d'offres suivies dans l'en-tête de navigation.
  - Persistance locale des données (`localStorage`).

#### JB-13 : Consultation et gestion de la liste des offres suivies
- **En tant qu'** apprenant,
- **Je veux** accéder à la page récapitulative de mes favoris et pouvoir en retirer au besoin,
- **Afin de** gérer mes candidatures en cours.
- **Critères d'acceptation** :
  - Affichage clair de toutes les annonces enregistrées.
  - Bouton de suppression fonctionnel retirant immédiatement l'offre de la liste de suivi.

---

### EPIC 4 : Publication & Dépôt d'offre

#### JB-14 : Accès au formulaire de dépôt d'offre
- **En tant qu'** recruteur ou administrateur,
- **Je veux** accéder à une page dédiée au dépôt d'annonces,
- **Afin de** renseigner une opportunité de stage ou d'alternance.
- **Critères d'acceptation** :
  - Lien dédié accessible depuis la barre de navigation.
  - Présentation claire des rubriques de saisie.

#### JB-15 : Soumission et validation d'une nouvelle offre
- **En tant qu'** utilisateur publiant une offre,
- **Je veux** soumettre le formulaire dûment complété,
- **Afin d'** enregistrer l'annonce sur le portail.
- **Critères d'acceptation** :
  - Contrôle strict des champs obligatoires (titre, entreprise, ville, contrat, description, contact).
  - Blocage de la soumission et retours visuels explicites en cas d'erreur ou d'omission.

#### JB-16 : Prévisualisation des données saisies avant publication
- **En tant qu'** auteur d'une annonce,
- **Je veux** visualiser un rendu préalable de l'offre avant sa publication finale,
- **Afin de** vérifier l'exactitude des informations saisies.
- **Critères d'acceptation** :
  - Vue d'aperçu conforme à l'affichage standard d'une fiche d'offre.

---

### EPIC 5 : Administration & Back-Office minimal

#### JB-17 : Visualisation du catalogue global des offres (Admin)
- **En tant qu'** administrateur,
- **Je veux** avoir un aperçu global de toutes les annonces publiées au sein d'un tableau synthétique,
- **Afin de** piloter et modérer facilement le catalogue.
- **Critères d'acceptation** :
  - Tableau lisible présentant l'identifiant, le titre, l'entreprise, le contrat et la date.
  - Actions rapides accessibles pour chaque entrée.

#### JB-18 : Création manuelle d'une offre par l'administrateur
- **En tant qu'** administrateur,
- **Je veux** initier la création d'une offre directement depuis le panneau d'administration,
- **Afin de** publier rapidement une annonce sans passer par le flux visiteur.
- **Critères d'acceptation** :
  - Bouton d'ajout bien visible dirigeant vers le formulaire d'enregistrement.

#### JB-19 : Modification d'une offre et association des technologies
- **En tant qu'** administrateur,
- **Je veux** mettre à jour le contenu d'une annonce existante et actualiser sa pile technologique,
- **Afin d'** ajuster les compétences requises selon l'évolution du besoin.
- **Critères d'acceptation** :
  - Pré-remplissage des champs du formulaire avec les valeurs existantes de l'offre.
  - Sauvegarde effective des modifications sans altérer les autres entrées.

#### JB-20 : Suppression définitive d'une offre
- **En tant qu'** administrateur,
- **Je veux** supprimer une annonce avec une étape de validation préalable,
- **Afin d'** éviter toute perte involontaire de données.
- **Critères d'acceptation** :
  - Déclenchement impératif d'une boîte modale de confirmation lors de l'action de suppression.
  - L'offre n'est purgée qu'après confirmation explicite par l'utilisateur.