import router from 'express';
import { ConsultaSchemaBase } from '../schemas/Consulta.schema.js';
import { Consulta } from '../models/Consulta.js';   
import { parse } from 'date-fns';   

export const consultaRoute = router();

// Rota para obter consultas
consultaRoute.get('/', async (req, res) => {
    try {
        const consultas = await Consulta.findAll();
        res.json(consultas);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para criar um nova consulta
consultaRoute.post('/', async (req, res) => {
    try {
        // Pré-validação e conversão dos dados
        const { dataConsulta } = req.body;
        const dataFormatada = parse(dataConsulta, 'dd/MM/yyyy', new Date());

        // Validando os dados com base no schema
        await ConsultaSchemaBase.validate({ ...req.body, dataConsulta: dataFormatada });

        // Criando a consulta
        const consulta = await Consulta.create({ ...req.body, dataConsulta: dataFormatada });

        res.status(201).json({ message: 'Consulta agendada com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um consulta pelo ID
consultaRoute.get('/:id', async (req, res) => {
    const consultaId = req.params.id;

    try {
        // Encontrar o consulta pelo ID
        const consulta = await Consulta.findByPk(consultaId);

        // Verificar se o consulta existe
        if (!consulta) {
            return res.status(404).json({ error: 'Consulta não encontrada.' });
        }

        // Retorna os detalhes do consulta
        res.json(consulta);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes da consulta:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um consulta pelo ID
consultaRoute.put('/:id', async (req, res) => {
    try {
        const consultaId = req.params.id;

        // Encontrar o consulta pelo ID
        const consulta = await Consulta.findByPk(consultaId);

        // Verificar se o consulta existe
        if (!consulta) {
            return res.status(404).json({ error: 'Consulta não encontrada.' });
        }

        // Validar dados recebidos do corpo da requisição com base no schema
        await ConsultaSchemaBase.validate(req.body);

        // Atualizar os dados do consulta no banco de dados
        await consulta.update(req.body);

        res.json({ message: 'Consulta atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar consulta:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um consulta pelo ID
consultaRoute.delete('/:id', async (req, res) => {
    const consultaId = req.params.id;
    
    try {
        // Encontrar o consulta pelo ID
        const consulta = await Consulta.findByPk(consultaId);

        // Verificar se o consulta existe
        if (!consulta) {
            return res.status(404).json({ error: 'Consulta não encontrada.' });
        }

        // Remover o consulta do banco de dados
        await consulta.destroy();

        res.json({ message: 'Consulta removida com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar consulta:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});