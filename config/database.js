import { Sequelize } from 'sequelize';
import config from './config.json' assert {type: 'json'};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

export const sequelize = new Sequelize(dbConfig);