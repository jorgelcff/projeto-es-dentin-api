import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('dentinbd', 'postgres', 'senha123', {
  host: 'localhost',
  dialect: 'postgres',
  port: '5432'
});
