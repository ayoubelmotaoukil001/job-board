const pool = require('../db');

const entrepriseRepository = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM entreprise ORDER BY nom ASC');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM entreprise WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async findByName(nom) {
    const [rows] = await pool.query('SELECT * FROM entreprise WHERE LOWER(nom) = LOWER(?) LIMIT 1', [nom.trim()]);
    return rows[0] || null;
  },

  async create(data) {
    const [result] = await pool.execute(
      'INSERT INTO entreprise (nom, logo, description) VALUES (?, ?, ?)',
      [data.nom.trim(), data.logo || null, data.description || null]
    );
    return result.insertId;
  },

  async findOrCreate(nom, logo = null, description = null) {
    const trimmedNom = nom.trim();
    const existing = await this.findByName(trimmedNom);
    if (existing) {
      return existing.id;
    }
    return await this.create({ nom: trimmedNom, logo, description });
  }
};

module.exports = entrepriseRepository;
