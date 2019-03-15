var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : process.env.POSTGRES_HOST,
    user     : 'postgres',
    password : process.env.POSTGRES_PASSWORD,
    database : 'postgres',
    charset  : 'utf8'
  }
});


exports.knex = knex;
