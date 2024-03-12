import router from 'express';
import { PagaConvSchemaBase } from "../schemas/PagaConv.schema.js";
import { Paga } from "../models/Paga.js";
import { Paciente } from '../models/Paciente.js';

export const pagaRoute = router();

// Rota para obter as relações
pagaRoute.get('/', async (req, res) => {
    try {
        const contratos = await Paga.findAll();
        res.json(contratos);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para obter todos os pacientes que contratam um determinado convênio
pagaRoute.get('/pacientes/:fkConvenio', async (req, res) => {
    const fkConvenio = req.params.fkConvenio;

    try {
        const contratos = await Paga.findAll({
            where: { fkConvenio: fkConvenio },
            attributes: {exclude: ['fkPaciente', 'fkConvenio', 'id']},
            include: [
                { model: Paciente, attributes: ['nome'], as: 'pacientes'}
            ]
        });
        const pacientes = contratos.map(contratos => contratos.pacientes)
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para criar um novo relacionamento
pagaRoute.post('/', async (req, res) => {
    try {
        await PagaConvSchemaBase.validate(req.body);
        const paga_conv = {...req.body}
        console.log('paga_conv', paga_conv);
        const paga_convatt = await Paga.create(paga_conv);
        console.log('paga_convatt', paga_convatt);
        res.status(201).json({ message: 'Relação estabelecida com sucesso!'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um relacionamento pelo ID
pagaRoute.get('/:id', async (req, res) => {
    const paga_convId = req.params.id;

    try {
        // Encontrar o relacionamento pelo ID
        const paga_conv = await Paga.findByPk(paga_convId);

        // Verificar se o relacionamento existe
        if (!paga_conv) {
            return res.status(404).json({ error: 'Relação não encontrada.' });
        }

        // Retorna os detalhes do relacionamento
        res.json(paga_conv);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do relacionamento:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um relacionamento pelo ID
pagaRoute.delete('/:id', async (req, res) => {
    const paga_convId = req.params.id;
    
    try {
        // Encontrar o relacionamento pelo ID
        const paga_conv = await Paga.findByPk(paga_convId);

        // Verificar se o relacionamento existe
        if (!paga_conv) {
            return res.status(404).json({ error: 'Relacionamento não encontrado.' });
        }

        // Remover o relacionamento do banco de dados
        await paga_conv.destroy();

        res.json({ message: 'Relacionamento removido com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar relacionamento:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
