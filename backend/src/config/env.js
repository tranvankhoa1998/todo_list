const env = process.env;

const config = {
  port: env.PORT || 3000,
  jwtSecret: env.SECRET_KEY || 'mysecret',
  databaseUrl: env.DATABASE_URL || '',
  dbUser: env.DB_USER || 'postgres',
  dbPass: env.DB_PASS || 'password',
  dbName: env.DB_NAME || 'todo',
  dbHost: env.DB_HOST || 'db',
  dbPort: env.DB_PORT || 5432,
};

module.exports = { config };
