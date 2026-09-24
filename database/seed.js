require('dotenv').config();
const mysql = require('mysql2/promise');

async function seed() {
  let connection;
  try {
    connection = await mysql.createConnection(process.env.DATABASE_URL);
    console.log('Connexion a la base de donnees reussie.');

    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('TRUNCATE TABLE offre_technologie');
    await connection.query('TRUNCATE TABLE offre');
    await connection.query('TRUNCATE TABLE technologie');
    await connection.query('TRUNCATE TABLE entreprise');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Nettoyage des tables effectue.');

    const entreprises = [
      ['DevCorp', 'https://via.placeholder.com/150', 'Societe specialisee dans le developpement web et mobile.'],
      ['InnoTech', 'https://via.placeholder.com/150', 'Startup axee sur les solutions Cloud et Intelligence Artificielle.'],
      ['WebStudio', 'https://via.placeholder.com/150', 'Agence digitale creative pour projets innovants.'],
      ['DataSolutions', 'https://via.placeholder.com/150', 'Cabinet d experts en modelisation et ingenierie de donnees.'],
      ['CloudWave', 'https://via.placeholder.com/150', 'Fournisseur d infrastructures reseaux modernes.']
    ];

    for (const entreprise of entreprises) {
      await connection.execute(
        'INSERT INTO entreprise (nom, logo, description) VALUES (?, ?, ?)',
        entreprise
      );
    }
    console.log('5 entreprises inserees avec succes.');

    const technologies = [
      ['JavaScript'], ['Node.js'], ['React'], ['MySQL'],
      ['TypeScript'], ['Docker'], ['Python'], ['PHP']
    ];

    for (const tech of technologies) {
      await connection.execute(
        'INSERT INTO technologie (nom) VALUES (?)',
        tech
      );
    }
    console.log('8 technologies inserees avec succes.');

    const offres = [
      ['Developpeur Full-Stack Node/React', 'Conception et developpement de plateformes web scalables.', 'Casablanca', 'CDI', '2026-09-01', 1],
      ['Stagiaire Backend JavaScript', 'Developpement d APIs REST avec Express et MySQL.', 'Rabat', 'Stage', '2026-09-05', 1],
      ['Ingenieur DevOps Junior', 'Gestion des conteneurs Docker et des pipelines CI/CD.', 'Tanger', 'CDI', '2026-09-10', 2],
      ['Developpeur Frontend React', 'Integration d interfaces responsives a partir de maquettes Figma.', 'Casablanca', 'CDD', '2026-09-12', 3],
      ['Alternant Data Analyst', 'Exploitation et analyse de bases de donnees SQL.', 'Marrakech', 'Alternance', '2026-09-14', 4],
      ['Developpeur Python Backend', 'Optimisation de services et traitement de donnees.', 'Rabat', 'CDI', '2026-09-15', 2],
      ['Stagiaire UI/Frontend', 'Creation de composants UI dynamiques et accessibles.', 'Fes', 'Stage', '2026-09-16', 3],
      ['Administrateur Base de Donnees', 'Optimisation des requetes et administration MySQL.', 'Casablanca', 'CDI', '2026-09-18', 4],
      ['Developpeur Cloud Node.js', 'Deploiement d architectures applicatives cloud.', 'Tanger', 'CDD', '2026-09-19', 5],
      ['Alternant Integrateur Web', 'Maintenance et integration d interfaces utilisateurs.', 'Agadir', 'Alternance', '2026-09-20', 3],
      ['Developpeur TypeScript Full-Stack', 'Migration et developpement d applications web modernes.', 'Casablanca', 'CDI', '2026-09-21', 1],
      ['Stage Pre-Embauche Backend', 'Implementation de modules back-end et tests.', 'Rabat', 'Stage', '2026-09-22', 5]
    ];

    for (const offre of offres) {
      await connection.execute(
        'INSERT INTO offre (titre, description, ville, type_contrat, date_publication, entreprise_id) VALUES (?, ?, ?, ?, ?, ?)',
        offre
      );
    }
    console.log('12 offres d emploi inserees avec succes.');

    const relations = [
      [1, 1], [1, 2], [1, 3],
      [2, 1], [2, 2], [2, 4],
      [3, 6],
      [4, 1], [4, 3],
      [5, 4], [5, 7],
      [6, 7],
      [7, 1],
      [8, 4],
      [9, 2], [9, 6],
      [10, 8],
      [11, 1], [11, 2], [11, 5],
      [12, 2], [12, 4]
    ];

    for (const rel of relations) {
      await connection.execute(
        'INSERT INTO offre_technologie (offre_id, technologie_id) VALUES (?, ?)',
        rel
      );
    }
    console.log('Associations offre-technologie inserees avec succes.');
    console.log('Seeding termine avec succes.');
  } catch (error) {
    console.error('Erreur lors du seeding :', error.message);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

if (require.main === module) {
  seed();
}

module.exports = seed;