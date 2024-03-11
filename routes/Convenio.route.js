import router from 'express';
import { ConvenioSchemaBase } from '../schemas/Convenio.schema.js';
import { Convenio } from '../models/Convenio.js';   

export const convenioRoute = router();

// Rota para obter convenios
convenioRoute.get('/', async (req, res) => {
    try {
        const convenios = await Convenio.findAll();
        res.json(convenios);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo convenio
convenioRoute.post('/', async (req, res) => {
    try {
        await ConvenioSchemaBase.validate(req.body);
        const convenio = {...req.body}
        console.log('convenio', convenio);
        const convenioatt = await Convenio.create(convenio);
        console.log('convenioatt', convenioatt);
        res.status(201).json({ message: 'Convenio criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um Convenio pelo ID
convenioRoute.get('/:id', async (req, res) => {
    const convenioId = req.params.id;

    try {
        // Encontrar o Convenio pelo ID
        const convenio = await Convenio.findByPk(convenioId);

        // Verificar se o Convenio existe
        if (!convenio) {
            return res.status(404).json({ error: 'Convenio não encontrado.' });
        }

        // Retorna os detalhes do Convenio
        res.json(convenio);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do convenio:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um Convenio pelo ID
convenioRoute.put('/:id', async (req, res) => {
    try {
        const convenioId = req.params.id;

        // Encontrar o Convenio pelo ID
        const convenio = await Convenio.findByPk(convenioId);

        // Verificar se o Convenio existe
        if (!convenio) {
            return res.status(404).json({ error: 'Convenio não encontrado.' });
        }

        // Validar dados recebidos do corpo da requisição com base no schema
        await ConvenioSchemaBase.validate(req.body);

        // Atualizar os dados do convenio no banco de dados
        await convenio.update(req.body);

        res.json({ message: 'Convenio atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar convenio:', error);
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um Convenio pelo ID
convenioRoute.delete('/:id', async (req, res) => {
    const convenioId = req.params.id;
    
    try {
        // Encontrar o Convenio pelo ID
        const convenio = await Convenio.findByPk(convenioId);

        // Verificar se o Convenio existe
        if (!convenio) {
            return res.status(404).json({ error: 'Convenio não encontrado.' });
        }

        // Remover o Convenio do banco de dados
        await convenio.destroy();

        res.json({ message: 'Convenio removido com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar convenio:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});