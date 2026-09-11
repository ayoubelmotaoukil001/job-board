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

#### JB-6 : Affichage de la liste des offres
- **En tant qu'** apprenant ou visiteur,
- **Je veux** visualiser l'ensemble des offres sous forme de cartes structurées,
- **Afin d'** identifier rapidement les opportunités disponibles.
- **Critères d'acceptation** :
  - Chaque carte affiche le titre du poste, l'entreprise, la localisation, le badge de contrat (STAGE ou ALTERNANCE) et la date.
  - La grille est responsive : 2 colonnes sur écran Desktop (1440px) et 1 colonne sur écran Mobile (375px).

#### JB-7 : Consultation de la fiche détail d'une offre
- **En tant qu'** apprenant,
- **Je veux** ouvrir la page détaillée d'une annonce,
- **Afin d'** étudier la mission et d'obtenir les coordonnées de candidature.
- **Critères d'acceptation** :
  - Affichage complet des sections : descriptif, missions, profil recherché, technologies et contact.
  - Présence d'un lien fonctionnel de retour vers le catalogue d'offres.

---

### EPIC 2 : Recherche, Filtres & Tri

#### JB-9 : Recherche textuelle par mots-clés
- **En tant qu'** apprenant,
- **Je veux** saisir des termes dans une barre de recherche,
- **Afin de** filtrer immédiatement les offres par intitulé de poste ou nom d'entreprise.
- **Critères d'acceptation** :
  - Champ de saisie actif filtrant la liste des offres visibles en temps réel.

#### JB-10 : Filtrage multicritères des offres
- **En tant qu'** apprenant,
- **Je veux** combiner plusieurs filtres (type de contrat, ville, technologie),
- **Afin d'** affiner mes résultats selon mes compétences et ma localisation.
- **Critères d'acceptation** :
  - Listes déroulantes indépendantes et cumulables.
  - Affichage d'un compteur indiquant le nombre d'offres correspondantes.

#### JB-11 : Tri des offres par date de publication
- **En tant qu'** apprenant,
- **Je veux** modifier l'ordre d'affichage (plus récent / plus ancien),
- **Afin de** consulter en priorité les annonces récentes.
- **Critères d'acceptation** :
  - Sélecteur de tri réorganisant dynamiquement l'ordre des cartes sans recharger la page.

---

### EPIC 3 : Suivi & Sauvegarde des offres

#### JB-12 : Mise en favori et suivi d'une offre
- **En tant qu'** apprenant,
- **Je veux** cliquer sur "Suivre" sur une offre,
- **Afin de** l'enregistrer dans ma liste personnelle.
- **Critères d'acceptation** :
  - Changement d'état visuel du bouton après le clic.
  - Incrémentation du badge dans la barre de navigation.
  - Sauvegarde locale des données dans le navigateur (`localStorage`).

#### JB-13 : Consultation et gestion de la liste des offres suivies
- **En tant qu'** apprenant,
- **Je veux** consulter la page dédiée à mes favoris et retirer des annonces au besoin,
- **Afin de** suivre et épurer mes candidatures actives.
- **Critères d'acceptation** :
  - Tableau ou cartes listant les offres sauvegardées.
  - Bouton de retrait immédiat avec actualisation du compteur de la navigation.

---

### EPIC 4 : Publication & Dépôt d'offre

#### JB-14 : Accès au formulaire de dépôt d'offre
- **En tant que** recruteur ou administrateur,
- **Je veux** accéder à la page de publication via un lien direct,
- **Afin de** soumettre une nouvelle opportunité de stage ou d'alternance.
- **Critères d'acceptation** :
  - Lien accessible dans la barre de navigation.
  - Page dédiée présentant les sections de saisie organisées.

#### JB-15 : Soumission et validation d'une nouvelle offre
- **En tant qu'** auteur d'une offre,
- **Je veux** valider le formulaire renseigné,
- **Afin de** publier l'annonce sur le portail.
- **Critères d'acceptation** :
  - Contrôle strict des champs requis (titre, entreprise, ville, type, description, contact).
  - Blocage et retours visuels d'erreur si des données sont incomplètes.

#### JB-16 : Prévisualisation des données saisies avant publication
- **En tant qu'** auteur,
- **Je veux** prévisualiser la carte et le détail de l'offre avant confirmation finale,
- **Afin de** vérifier l'exactitude des informations saisies.
- **Critères d'acceptation** :
  - Rendu d'aperçu conforme à l'affichage final d'une offre.

---

### EPIC 5 : Administration & Back-Office minimal

#### JB-17 : Visualisation du catalogue global des offres (Admin)
- **En tant qu'** administrateur,
- **Je veux** afficher toutes les annonces dans un tableau centralisé,
- **Afin d'** avoir une vue globale sur le parc d'offres.
- **Critères d'acceptation** :
  - Tableau listant ID, Titre, Entreprise, Contrat, Date.
  - Accès aux options de gestion (Modifier, Supprimer).

#### JB-18 : Création manuelle d'une offre par l'administrateur
- **En tant qu'** administrateur,
- **Je veux** lancer la création d'une offre depuis l'espace d'administration,
- **Afin d'** alimenter rapidement le catalogue.
- **Critères d'acceptation** :
  - Bouton dédié ouvrant le formulaire de publication.

#### JB-19 : Modification d'une offre et association des technologies
- **En tant qu'** administrateur,
- **Je veux** éditer les informations d'une annonce et mettre à jour ses tags technologiques,
- **Afin de** corriger ou affiner les compétences attendues.
- **Critères d'acceptation** :
  - Formulaire pré-rempli avec les données actuelles de l'offre.
  - Enregistrement effectif des modifications.

#### JB-20 : Suppression définitive d'une offre
- **En tant qu'** administrateur,
- **Je veux** confirmer expressément la suppression d'une offre,
- **Afin d'** éviter toute perte involontaire de données.
- **Critères d'acceptation** :
  - Affichage obligatoire d'une modale de confirmation lors du clic sur "Supprimer".
  - Suppression exécutée uniquement après validation de la modale.