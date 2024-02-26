import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

export const Convenio = sequelize.define('Convenio', {
    pkConvenio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(45),
        allowNull: true
    }
}, {
    tableName: 'convenios',
    timestamps: false
});

