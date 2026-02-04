const { Pool } = require('pg');
const { config } = require('../../config/env');

const pool = config.databaseUrl
  ? new Pool({ connectionString: config.databaseUrl })
  : new Pool({
      user: config.dbUser,
      host: config.dbHost,
      database: config.dbName,
      password: config.dbPass,
      port: config.dbPort,
    });

module.exports = { pool };
