const pool = require('../db');

const technologieRepository = {
  async findAll() {
    const [rows] = await pool.query('SELECT id, nom FROM technologie ORDER BY nom ASC');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT id, nom FROM technologie WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async findByName(nom) {
    const [rows] = await pool.query('SELECT id, nom FROM technologie WHERE LOWER(nom) = LOWER(?) LIMIT 1', [nom.trim()]);
    return rows[0] || null;
  },

  async create(nom) {
    const [result] = await pool.execute('INSERT INTO technologie (nom) VALUES (?)', [nom.trim()]);
    return result.insertId;
  },

  async findOrCreate(nom) {
    const trimmedNom = nom.trim();
    const existing = await this.findByName(trimmedNom);
    if (existing) {
      return existing.id;
    }
    return await this.create(trimmedNom);
  },

  async getByOffreId(offreId) {
    const [rows] = await pool.query(
      'SELECT t.id, t.nom FROM technologie t JOIN offre_technologie ot ON t.id = ot.technologie_id WHERE ot.offre_id = ? ORDER BY t.nom ASC',
      [offreId]
    );
    return rows;
  },

  async syncOffreTechnologies(offreId, technologiesInput) {
    await pool.execute('DELETE FROM offre_technologie WHERE offre_id = ?', [offreId]);

    let techList = [];
    if (Array.isArray(technologiesInput)) {
      techList = technologiesInput;
    } else if (typeof technologiesInput === 'string' && technologiesInput.trim().length > 0) {
      techList = technologiesInput.split(',').map(t => t.trim()).filter(Boolean);
    }

    const uniqueIds = new Set();

    for (const item of techList) {
      if (typeof item === 'number' || (!isNaN(item) && Number.isInteger(Number(item)) && String(item).trim() !== '')) {
        const tech = await this.findById(Number(item));
        if (tech) {
          uniqueIds.add(tech.id);
          continue;
        }
      }
      const name = String(item).trim();
      if (name.length > 0) {
        const techId = await this.findOrCreate(name);
        uniqueIds.add(techId);
      }
    }

    for (const techId of uniqueIds) {
      await pool.execute(
        'INSERT INTO offre_technologie (offre_id, technologie_id) VALUES (?, ?)',
        [offreId, techId]
      );
    }

    return Array.from(uniqueIds);
  }
};

module.exports = technologieRepository;
