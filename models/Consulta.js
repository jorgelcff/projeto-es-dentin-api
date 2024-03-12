import {DataTypes} from 'sequelize';
import {sequelize} from '../config/database.js';

import {Paciente} from './Paciente.js';
import {Dentista} from './Dentista.js';
import {Consultorio} from './Consultorio.js';

export const Consulta = sequelize.define('Consulta', {
  pkConsulta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  fkPaciente: {
      type: DataTypes.INTEGER,
      allowNull: true 
  },
  dataConsulta: {
      type: DataTypes.DATE,
      allowNull: false
  },
  horaConsulta:{
    type: DataTypes.STRING(11),
    allowNull: false
  },
  fkDentista: {
      type: DataTypes.INTEGER,
      allowNull: true
  },
  tipo: {
      type: DataTypes.STRING(25),
      allowNull: true
  },
  preco: {
      type: DataTypes.DOUBLE,
      allowNull: true
  },
  sala: {
      type: DataTypes.STRING(10),
      allowNull: false,
  },
  status: {
      type: DataTypes.STRING(10),
      allowNull: true
  },
  fkConsultorio: {
      type: DataTypes.INTEGER,
      allowNull: false,
  }
}, {
  tableName: 'consultas',
  timestamps: false
});


Consulta.belongsTo(Paciente, { foreignKey: 'fkPaciente', targetKey: 'pkPaciente' });
Consulta.belongsTo(Dentista, { foreignKey: 'fkDentista', targetKey: 'pkDentista' });
Consulta.belongsTo(Consultorio, { foreignKey: 'fkConsultorio', targetKey: 'pkConsultorio' })


//module.exports = Consulta;