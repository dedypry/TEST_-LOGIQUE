// import dotenv module
require('dotenv').config();

// Update with your config settings.


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  testing: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'database/migrations',
    },
    seeds: {
      directory: 'database/seeders',
    },
  },

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    ssl: {
      rejectUnauthorized: false,
    },
    // connection: pgconfig,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'database/migrations',
    },
    seeds: {
      directory: 'database/seeders',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: 'database/migrations',
    },
    seeds: {
      directory: 'database/seeders',
    },
  },
};
