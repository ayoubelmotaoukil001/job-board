# Portail Stages & Alternances — Promotion MERN 2026/2027

Site web multi-pages moderne et minimaliste (style SaaS / Notion / Linear) dédié à la centralisation, la consultation et la gestion d'offres de stages et d'alternances dans les métiers du développement web.
La structure HTML sémantique et le style Tailwind CSS permettent une conversion directe en maquettes Figma via le plugin HTML to Figma.

---

## 1. Structure du Projet

```text
job-board/
├── index.html            # Catalogue principal & barre de recherche avec filtres
├── offre-detail.html     # Fiche détaillée d'une offre (Missions, Profil, Contact)
├── offres-suivies.html   # Gestion des favoris / offres enregistrées
├── deposer-offre.html    # Formulaire de publication / dépôt d'une nouvelle offre
├── admin.html            # Tableau de bord d'administration & modal de confirmation
├── css/
│   └── style.css         # Typographie Inter & variables CSS globales
├── docs/
│   ├── analyse-cahier-des-charges.md  # Analyse synthétique du besoin produit
│   ├── jira-backlog.md                # Découpage agile & User Stories Jira
│   └── figma-specifications.md        # Documentation d'organisation Figma
└── README.md             # Documentation principale du projet