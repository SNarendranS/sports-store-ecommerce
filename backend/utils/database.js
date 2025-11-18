import { Sequelize } from 'sequelize';

import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.PG_URL, {
  dialect: 'postgres',
  logging: false,
});

const database = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected successfully');

    // Sync models with DB
    //await sequelize.sync({ alter: true }); 

  } catch (err) {
    console.error('❌ PostgreSQL connection error:', err.message);
    process.exit(1);
  }
};

export {sequelize, database };