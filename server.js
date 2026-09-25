require('dotenv').config();
const express = require('express');
const path = require('path');
const entrepriseRepository = require('./src/repositories/entrepriseRepository');
const technologieRepository = require('./src/repositories/technologieRepository');
const offreRepository = require('./src/repositories/offreRepository');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const offers = await offreRepository.findAll(req.query);
    const villes = await offreRepository.getVilles();
    const contrats = await offreRepository.getContrats();
    const technologies = await technologieRepository.findAll();

    res.render('index', {
      offers,
      villes,
      contrats,
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
    const offers = await offreRepository.findAll();
    res.render('offres-suivies', { offers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.get('/offres/:id', async (req, res) => {
  try {
    const offer = await offreRepository.findById(req.params.id);
    if (!offer) {
      return res.status(404).send('Offre non trouvee');
    }
    res.render('offre-detail', { offer });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.get('/admin', async (req, res) => {
  try {
    const offers = await offreRepository.findAllForAdmin();
    res.render('admin', { offers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.get('/admin/offres/creer', async (req, res) => {
  try {
    const entreprises = await entrepriseRepository.findAll();
    const technologies = await technologieRepository.findAll();
    res.render('offre-form', { offer: null, entreprises, technologies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.post('/admin/offres', async (req, res) => {
  try {
    const { titre, description, ville, type_contrat, entreprise_id, technologies } = req.body;
    const techIds = Array.isArray(technologies) ? technologies : (technologies ? [technologies] : []);
    await offreRepository.create({ titre, description, ville, type_contrat, entreprise_id }, techIds);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.get('/admin/offres/editer/:id', async (req, res) => {
  try {
    const offer = await offreRepository.findById(req.params.id);
    if (!offer) {
      return res.status(404).send('Offre non trouvee');
    }
    const entreprises = await entrepriseRepository.findAll();
    const technologies = await technologieRepository.findAll();
    res.render('offre-form', { offer, entreprises, technologies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.post('/admin/offres/editer/:id', async (req, res) => {
  try {
    const { titre, description, ville, type_contrat, entreprise_id, technologies } = req.body;
    const techIds = Array.isArray(technologies) ? technologies : (technologies ? [technologies] : []);
    await offreRepository.update(req.params.id, { titre, description, ville, type_contrat, entreprise_id }, techIds);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.post('/admin/offres/supprimer/:id', async (req, res) => {
  try {
    await offreRepository.deleteById(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur interne');
  }
});

app.listen(PORT, () => {
  console.log('Serveur demarre sur le port ' + PORT);
});