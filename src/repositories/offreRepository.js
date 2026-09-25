const pool = require('../db');
const technologieRepository = require('./technologieRepository');
const entrepriseRepository = require('./entrepriseRepository');

const offreRepository = {
  async findAll(filters = {}) {
    let query = `
      SELECT DISTINCT o.id, o.titre, o.description, o.ville, o.type_contrat, o.date_publication, o.entreprise_id,
             e.nom AS entreprise_nom, e.logo AS entreprise_logo, e.description AS entreprise_description
      FROM offre o
      JOIN entreprise e ON o.entreprise_id = e.id
      LEFT JOIN offre_technologie ot ON o.id = ot.offre_id
      WHERE 1=1
    `;
    const params = [];

    if (filters.search) {
      query += ` AND (o.titre LIKE ? OR o.description LIKE ? OR e.nom LIKE ?)`;
      params.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
    }

    if (filters.contrat) {
      query += ` AND o.type_contrat = ?`;
      params.push(filters.contrat);
    }

    if (filters.ville) {
      query += ` AND o.ville = ?`;
      params.push(filters.ville);
    }

    if (filters.technologie) {
      query += ` AND ot.technologie_id = ?`;
      params.push(filters.technologie);
    }

    if (filters.sort === 'asc') {
      query += ` ORDER BY o.date_publication ASC`;
    } else {
      query += ` ORDER BY o.date_publication DESC`;
    }

    const [offers] = await pool.query(query, params);

    for (const offer of offers) {
      offer.technologies = await technologieRepository.getByOffreId(offer.id);
    }

    return offers;
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT o.id, o.titre, o.description, o.ville, o.type_contrat, o.date_publication, o.entreprise_id,
              e.nom AS entreprise_nom, e.logo AS entreprise_logo, e.description AS entreprise_description
       FROM offre o
       JOIN entreprise e ON o.entreprise_id = e.id
       WHERE o.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return null;
    }

    const offer = rows[0];
    offer.technologies = await technologieRepository.getByOffreId(offer.id);
    return offer;
  },

  async create(data) {
    let entrepriseId = data.entreprise_id || null;
    if (!entrepriseId && data.entreprise_nom) {
      entrepriseId = await entrepriseRepository.findOrCreate(data.entreprise_nom);
    }
    if (!entrepriseId) {
      const defaultCompanies = await entrepriseRepository.findAll();
      if (defaultCompanies.length > 0) {
        entrepriseId = defaultCompanies[0].id;
      }
    }

    const datePublication = data.date_publication || new Date().toISOString().slice(0, 10);

    let fullDescription = data.description || '';
    if (data.profil && data.profil.trim().length > 0) {
      fullDescription += '\n\nProfil recherché :\n' + data.profil.trim();
    }
    if (data.contact_email && data.contact_email.trim().length > 0) {
      fullDescription += '\n\nContact : ' + data.contact_email.trim();
    }

    const titre = data.titre || '';
    const ville = data.ville || '';
    const typeContrat = data.type_contrat || '';

    const [result] = await pool.execute(
      'INSERT INTO offre (titre, description, ville, type_contrat, date_publication, entreprise_id) VALUES (?, ?, ?, ?, ?, ?)',
      [titre, fullDescription, ville, typeContrat, datePublication, entrepriseId]
    );

    const newId = result.insertId;

    if (data.technologies) {
      await technologieRepository.syncOffreTechnologies(newId, data.technologies);
    }

    return newId;
  },

  async update(id, data) {
    const existing = await this.findById(id);
    if (!existing) {
      return false;
    }

    let entrepriseId = data.entreprise_id || null;
    if (!entrepriseId && data.entreprise_nom) {
      entrepriseId = await entrepriseRepository.findOrCreate(data.entreprise_nom);
    }

    const datePublication = data.date_publication || existing.date_publication;
    const finalEntrepriseId = entrepriseId || existing.entreprise_id || null;
    const titre = data.titre || existing.titre || '';
    const description = data.description || existing.description || '';
    const ville = data.ville || existing.ville || '';
    const typeContrat = data.type_contrat || existing.type_contrat || '';

    await pool.execute(
      'UPDATE offre SET titre = ?, description = ?, ville = ?, type_contrat = ?, date_publication = ?, entreprise_id = ? WHERE id = ?',
      [titre, description, ville, typeContrat, datePublication, finalEntrepriseId, id]
    );

    if (data.technologies !== undefined) {
      await technologieRepository.syncOffreTechnologies(id, data.technologies);
    }

    return true;
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM offre WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async deleteById(id) {
    return this.delete(id);
  },

  async findAllForAdmin() {
    return this.findAll();
  },

  async getDistinctVilles() {
    const [rows] = await pool.query('SELECT DISTINCT ville FROM offre ORDER BY ville ASC');
    return rows.map(r => r.ville);
  },

  async getDistinctContrats() {
    const [rows] = await pool.query('SELECT DISTINCT type_contrat FROM offre ORDER BY type_contrat ASC');
    return rows.map(r => r.type_contrat);
  }
};

module.exports = offreRepository;
