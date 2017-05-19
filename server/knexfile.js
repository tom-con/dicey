module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE_URL || 'dicey_dev',
    }
  },
  "production": {
    "client": "pg",
    "connection": process.env.DATABASE_URL
  }
};
