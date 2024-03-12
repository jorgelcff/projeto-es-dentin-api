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
    expediente: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'atende_consul',
    timestamps: false
});


Atende.belongsTo(Dentista, { foreignKey: 'fkDentista', targetKey: 'pkDentista', as: 'dentistas'});
Atende.belongsTo(Consultorio, { foreignKey: 'fkConsultorio', targetKey: 'pkConsultorio', as: 'consultorios' });


//module.exports = Atende;
