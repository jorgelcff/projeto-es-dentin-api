import router from 'express';
import { AtendeConsulSchemaBase } from "../schemas/AtendeConsul.schema.js";
import { Atende } from "../models/Atende.js";
import { Dentista } from '../models/Dentista.js';
import { Consultorio } from '../models/Consultorio.js';

export const atendeRoute = router();

// Rota para obter as relações
atendeRoute.get('/', async (req, res) => {
    try {
        const atendimentos = await Atende.findAll();
        res.json(atendimentos);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para obter todos os dentistas que trabalham em determinado consultório
atendeRoute.get('/dentistas/:fkConsultorio', async (req, res) => {
    const fkConsultorio = req.params.fkConsultorio;

    try {
        const dentistas = await Atende.findAll({
            where: { fkConsultorio: fkConsultorio },
            exclude: ['fkConsultorio', 'fkDentista', 'admissao'],
            include: [
                { model: Dentista, attributes: ['nome', 'cro'], as: 'dentistas'}
            ]
        });
        res.json(dentistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter todos os consultórios que determinado dentista trabalha
atendeRoute.get('/consultas/:fkDentista', async (req, res) => {
    const fkDentista = req.params.fkDentista;

    try {
        const consultas = await Atende.findAll({
            where: { fkDentista: fkDentista },
            include: [
                { model: Consultorio, attributes: ['nome'] }
            ]
        });
        res.json(consultas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para criar um novo relacionamento
atendeRoute.post('/', async (req, res) => {
    try {
        await AtendeConsulSchemaBase.validate(req.body);
        const atende_dent = {...req.body}
        console.log('atende_dent', atende_dent);
        const atende_dentatt = await Aceita.create(atende_dent);
        console.log('atende_dentatt', atende_dentatt);
        res.status(201).json({ message: 'Relação estabelecida com sucesso!'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um relacionamento pelo ID
atendeRoute.get('/:id', async (req, res) => {
    const atende_dentId = req.params.id;

    try {
        // Encontrar o relacionamento pelo ID
        const atende_dent = await Atende.findByPk(atende_dentId);

        // Verificar se o relacionamento existe
        if (!atende_dent) {
            return res.status(404).json({ error: 'Relação não encontrada.' });
        }

        // Retorna os detalhes do relacionamento
        res.json(atende_dent);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do relacionamento:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um relacionamento pelo ID
atendeRoute.delete('/:id', async (req, res) => {
    const atende_dentId = req.params.id;
    
    try {
        // Encontrar o relacionamento pelo ID
        const atende_dent = await Atende.findByPk(atende_dentId);

        // Verificar se o relacionamento existe
        if (!atende_dent) {
            return res.status(404).json({ error: 'Relacionamento não encontrado.' });
        }

        // Remover o relacionamento do banco de dados
        await atende_dent.destroy();

        res.json({ message: 'Relacionamento removido com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar relacionamento:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
