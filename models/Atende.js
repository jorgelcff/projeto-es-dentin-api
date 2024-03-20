import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Consultorio} from './Consultorio.js';
import {Dentista} from './Dentista.js';

export const Atende = sequelize.define('Atende', {
    fkDentista: {
        type: DataTypes.INTEGER,
        allowNull: false, 
    },
    fkConsultorio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seg: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    ter: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    qua: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    qui: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    sex: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    sab: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    dom:{
        type: DataTypes.STRING(11),
        allowNull: true
    }
}, {
    tableName: 'atende_consul',
    timestamps: false
});


Atende.belongsTo(Dentista, { foreignKey: 'fkDentista', targetKey: 'pkDentista', as: 'dentistas'});
Atende.belongsTo(Consultorio, { foreignKey: 'fkConsultorio', targetKey: 'pkConsultorio', as: 'consultorios' });


//module.exports = Atende;
