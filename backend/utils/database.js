const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  logging: false,
});

const database = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');

    // Sync models with DB
    //await sequelize.sync({ aflter: true }); 

  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
    process.exit(1);
  }
};

module.exports = { sequelize, database };