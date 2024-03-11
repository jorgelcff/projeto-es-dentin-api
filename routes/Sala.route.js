import router from 'express';
import {SalaSchemaBase} from '../schemas/Sala.schema.js';
import {Sala} from '../models/Sala.js'

export const salaRoute = router();

// Rota para obter salas
salaRoute.get('/', async (req, res) => {
    try {
        const salas = await Sala.findAll();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo sala
salaRoute.post('/', async (req, res) => {
    try {
        await SalaSchemaBase.validate(req.body);
        const sala = {...req.body}
        console.log('sala', sala);
        const salaatt = await Sala.create(sala);
        console.log('salaatt', salaatt);
        res.status(201).json({ message: 'Sala criada com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um sala pelo ID
salaRoute.get('/:id', async (req, res) => {
    const salaId = req.params.id;

    try {
        // Encontrar o sala pelo ID
        const sala = await Sala.findByPk(salaId);

        // Verificar se o sala existe
        if (!sala) {
            return res.status(404).json({ error: 'Sala não encontrada.' });
        }

        // Retorna os detalhes do sala
        res.json(sala);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do sala:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um sala pelo ID
salaRoute.put('/:id', async (req, res) => {
    try {
        const salaId = req.params.id;

        // Encontrar o sala pelo ID
        const sala = await Sala.findByPk(salaId);

        // Verificar se o sala existe
        if (!sala) {
            return res.status(404).json({ error: 'Sala não encontrada.' });
        }

        // Validar dados recebidos do corpo da requisição com base no schema
        await SalaSchemaBase.validate(req.body);

        // Atualizar os dados do sala no banco de dados
        await sala.update(req.body);

        res.json({ message: 'Sala atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar sala:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um sala pelo ID
salaRoute.delete('/:id', async (req, res) => {
    const salaId = req.params.id;
    
    try {
        // Encontrar o sala pelo ID
        const sala = await Sala.findByPk(salaId);

        // Verificar se o sala existe
        if (!sala) {
            return res.status(404).json({ error: 'Sala não encontrada.' });
        }

        // Remover o sala do banco de dados
        await sala.destroy();

        res.json({ message: 'Sala removida com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar sala:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});