require('dotenv').config();
const express = require('express');
const path = require('path');
const pool = require('./src/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const { search, contrat, ville, technologie, sort } = req.query;
    const params = [];

    let query = `
      SELECT DISTINCT o.id, o.titre, o.description, o.ville, o.type_contrat, o.date_publication, o.entreprise_id,
             e.nom AS entreprise_nom, e.logo AS entreprise_logo
      FROM offre o
      JOIN entreprise e ON o.entreprise_id = e.id
      LEFT JOIN offre_technologie ot ON o.id = ot.offre_id
      WHERE 1=1
    `;

    if (search) {
      query += ` AND (o.titre LIKE ? OR o.description LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }
    if (contrat) {
      query += ` AND o.type_contrat = ?`;
      params.push(contrat);
    }
    if (ville) {
      query += ` AND o.ville = ?`;
      params.push(ville);
    }
    if (technologie) {
      query += ` AND ot.technologie_id = ?`;
      params.push(technologie);
    }

    if (sort === 'asc') {
      query += ` ORDER BY o.date_publication ASC`;
    } else {
      query += ` ORDER BY o.date_publication DESC`;
    }

    const [offers] = await pool.query(query, params);

    for (const offer of offers) {
      const [techs] = await pool.query(
        'SELECT t.id, t.nom FROM technologie t JOIN offre_technologie ot ON t.id = ot.technologie_id WHERE ot.offre_id = ? ORDER BY t.nom ASC',
        [offer.id]
      );
      offer.technologies = techs;
    }

    const [villes] = await pool.query('SELECT DISTINCT ville FROM offre ORDER BY ville ASC');
    const [contrats] = await pool.query('SELECT DISTINCT type_contrat FROM offre ORDER BY type_contrat ASC');
    const [technologies] = await pool.query('SELECT id, nom FROM technologie ORDER BY nom ASC');

    res.render('index', {
      offers,
      villes: villes.map(v => v.ville),
      contrats: contrats.map(c => c.type_contrat),
      technologies,
      query: req.query
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.get('/offres-suivies', async (req, res) => {
  try {
    const [offers] = await pool.query(
      `SELECT o.id, o.titre, o.description, o.ville, o.type_contrat, o.date_publication,
              e.nom AS entreprise_nom
       FROM offre o
       JOIN entreprise e ON o.entreprise_id = e.id
       ORDER BY o.date_publication DESC`
    );

    res.render('offres-suivies', { offers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.get('/offres/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT o.id, o.titre, o.description, o.ville, o.type_contrat, o.date_publication, o.entreprise_id,
              e.nom AS entreprise_nom, e.logo AS entreprise_logo, e.description AS entreprise_description
       FROM offre o
       JOIN entreprise e ON o.entreprise_id = e.id
       WHERE o.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).send('Offre non trouvee');
    }

    const offer = rows[0];
    const [techs] = await pool.query(
      'SELECT t.id, t.nom FROM technologie t JOIN offre_technologie ot ON t.id = ot.technologie_id WHERE ot.offre_id = ? ORDER BY t.nom ASC',
      [offer.id]
    );
    offer.technologies = techs;

    res.render('offre-detail', { offer });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.listen(PORT, () => {
  console.log('Serveur demarre sur le port ' + PORT);
});