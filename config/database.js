import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('dentinbd', 'postgres', 'freitas', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432'
});
