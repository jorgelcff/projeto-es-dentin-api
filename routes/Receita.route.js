import router from 'express';
import { ReceitaSchemaBase } from "../schemas/Receita.schema.js";
import { Receita } from "../models/Receita.js";

export const receitaRoute = router();

// Rota para obter receitas
receitaRoute.get('/', async (req, res) => {
    try {
        const receitas = await Receita.findAll();
        res.json(receitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo receita
receitaRoute.post('/', async (req, res) => {
    try {
        await ReceitaSchemaBase.validate(req.body);
        const receita = {...req.body}
        console.log('receita', receita);
        const receitaatt = await Receita.create(receita);
        console.log('receitaatt', receitaatt);
        res.status(201).json({ message: 'receita criada com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um receita pelo ID
receitaRoute.get('/:id', async (req, res) => {
    const receitaId = req.params.id;

    try {
        // Encontrar o receita pelo ID
        const receita = await Receita.findByPk(receitaId);

        // Verificar se o receita existe
        if (!receita) {
            return res.status(404).json({ error: 'receita não encontrada.' });
        }

        // Retorna os detalhes do receita
        res.json(receita);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do receita:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um receita pelo ID
receitaRoute.put('/:id', async (req, res) => {
    try {
        const receitaId = req.params.id;

        // Encontrar o receita pelo ID
        const receita = await Receita.findByPk(receitaId);

        // Verificar se o receita existe
        if (!receita) {
            return res.status(404).json({ error: 'receita não encontrada.' });
        }

        // Validar dados recebidos do corpo da requisição com base no schema
        await ReceitaSchemaBase.validate(req.body);

        // Atualizar os dados do receita no banco de dados
        await receita.update(req.body);

        res.json({ message: 'receita atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar receita:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um receita pelo ID
receitaRoute.delete('/:id', async (req, res) => {
    const receitaId = req.params.id;
    
    try {
        // Encontrar o receita pelo ID
        const receita = await Receita.findByPk(receitaId);

        // Verificar se o receita existe
        if (!receita) {
            return res.status(404).json({ error: 'receita não encontrada.' });
        }

        // Remover o receita do banco de dados
        await receita.destroy();

        res.json({ message: 'receita removida com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar receita:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});