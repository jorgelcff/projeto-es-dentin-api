import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Consultorio} from './Consultorio.js';

export const Sala = sequelize.define('Sala', {
    fkConsultorio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    num: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true
    }

}, {
    tableName: 'salas',
    timestamps: false
});



Sala.belongsTo(Consultorio, { foreignKey: 'fkConsultorio', targetKey: 'pkConsultorio' });


//module.exports = Atende;
