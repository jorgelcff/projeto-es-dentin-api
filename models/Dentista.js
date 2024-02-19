import { DataTypes } from 'sequelize';
import {sequelize} from '../config/database.js';

import {Convenio} from './Convenio.js';

export const Dentista = sequelize.define('Dentista', {
    pkDentista: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    user: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    cpf: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        unique: true
    },
    rg: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    cro: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    especialidadeNN: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    especialidade2: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    especialidade3: {
        type: DataTypes.STRING(15),
        allowNull: true
    },
    telefone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    dataNasc: {
        type: DataTypes.DATE,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    uf: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    bairro: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    rua: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    endereco: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fkConvenio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'convenios',
            key: 'pkConvenio'
        }
    }
}, {
    tableName: 'dentistas',
    timestamps: false
});


Dentista.belongsTo(Convenio, { foreignKey: 'fkConvenio', targetKey: 'pkConvenio' });

