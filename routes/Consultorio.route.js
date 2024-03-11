import router from 'express';
import {ConsultorioSchemaBase} from '../schemas/Consultorio.schema.js';
import {Consultorio} from '../models/Consultorio.js'

export const consultorioRoute = router();

// Rota para obter consultorios
consultorioRoute.get('/', async (req, res) => {
    try {
        const consultorios = await Consultorio.findAll();
        res.json(consultorios);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo consultorio
consultorioRoute.post('/', async (req, res) => {
    try {
        await ConsultorioSchemaBase.validate(req.body);
        const consultorio = {...req.body}
        console.log('consultorio', consultorio);
        const consultorioatt = await Consultorio.create(consultorio);
        console.log('consultorioatt', consultorioatt);
        res.status(201).json({ message: 'Consultorio criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um Consultorio pelo ID
consultorioRoute.get('/:id', async (req, res) => {
    const consultorioId = req.params.id;

    try {
        // Encontrar o Consultorio pelo ID
        const consultorio = await Consultorio.findByPk(consultorioId);

        // Verificar se o Consultorio existe
        if (!consultorio) {
            return res.status(404).json({ error: 'Consultorio não encontrado.' });
        }

        // Retorna os detalhes do Consultorio
        res.json(consultorio);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do consultorio:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um Consultorio pelo ID
consultorioRoute.put('/:id', async (req, res) => {
    try {
        const consultorioId = req.params.id;

        // Encontrar o Consultorio pelo ID
        const consultorio = await Consultorio.findByPk(consultorioId);

        // Verificar se o Consultorio existe
        if (!consultorio) {
            return res.status(404).json({ error: 'Consultorio não encontrado.' });
        }

        // Validar dados recebidos do corpo da requisição com base no schema
        await ConsultorioSchemaBase.validate(req.body);

        // Atualizar os dados do consultorio no banco de dados
        await consultorio.update(req.body);

        res.json({ message: 'Consultorio atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar consultorio:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um Consultorio pelo ID
consultorioRoute.delete('/:id', async (req, res) => {
    const consultorioId = req.params.id;
    
    try {
        // Encontrar o Consultorio pelo ID
        const consultorio = await Consultorio.findByPk(consultorioId);

        // Verificar se o Consultorio existe
        if (!consultorio) {
            return res.status(404).json({ error: 'Consultorio não encontrado.' });
        }

        // Remover o Consultorio do banco de dados
        await consultorio.destroy();

        res.json({ message: 'Consultorio removido com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar consultorio:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});