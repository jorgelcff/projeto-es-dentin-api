import router from 'express';
import { AceitaConvSchemaBase } from "../schemas/AceitaConv.schema.js";
import { Aceita } from "../models/Aceita.js";
import { Dentista } from '../models/Dentista.js';
import { Convenio } from '../models/Convenio.js';

export const aceitaRoute = router();

// Rota para obter as relações
aceitaRoute.get('/', async (req, res) => {
    try {
        const aceitacoes = await Aceita.findAll();
        res.json(aceitacoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para obter todos os dentistas que aceitam um convênio determinado
aceitaRoute.get('/dentistas/:fkConvenio', async (req, res) => {
    const fkConvenio = req.params.fkConvenio;

    try {
        const aceitacoes = await Aceita.findAll({
            where: { fkConvenio: fkConvenio },
            attributes:{exclude: ['id', 'fkConvenio', 'fkDentista']},
            include: [{ model: Dentista, attributes: ['nome', 'cro'], as: 'dentistas'}]
        });
        const dentistas = aceitacoes.map(aceitacoes => aceitacoes.dentistas)
        res.json(dentistas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para obter todos os convênios que um dentista determinado aceita
aceitaRoute.get('/convenios/:fkDentista', async (req, res) => {
    const fkDentista = req.params.fkDentista;

    try {
        const aceitacoes = await Aceita.findAll({
            where: { fkDentista: fkDentista },
            attributes:{exclude: ['id', 'fkConvenio', 'fkDentista']},
            include: [{ model: Convenio, attributes: ['nome'], as : 'convenios' }]
        });
        const convenios = aceitacoes.map(aceitacoes => aceitacoes.convenios)
        res.json(convenios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para criar um novo relacionamento
aceitaRoute.post('/', async (req, res) => {
    try {
        await AceitaConvSchemaBase.validate(req.body);
        const dent_conv = {...req.body}
        console.log('dent_conv', dent_conv);
        const dent_convatt = await Aceita.create(dent_conv);
        console.log('dent_convatt', dent_convatt);
        res.status(201).json({ message: 'Relação estabelecida com sucesso!'});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um relacionamento pelo ID
aceitaRoute.get('/:id', async (req, res) => {
    const dent_convId = req.params.id;

    try {
        // Encontrar o relacionamento pelo ID
        const dent_conv = await Aceita.findByPk(dent_convId);

        // Verificar se o relacionamento existe
        if (!dent_conv) {
            return res.status(404).json({ error: 'Relação não encontrada.' });
        }

        // Retorna os detalhes do relacionamento
        res.json(dent_conv);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do relacionamento:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para deletar um relacionamento pelo ID
aceitaRoute.delete('/:id', async (req, res) => {
    const dent_convId = req.params.id;
    
    try {
        // Encontrar o relacionamento pelo ID
        const dent_conv = await Aceita.findByPk(dent_convId);

        // Verificar se o relacionamento existe
        if (!dent_conv) {
            return res.status(404).json({ error: 'Relacionamento não encontrado.' });
        }

        // Remover o relacionamento do banco de dados
        await dent_conv.destroy();

        res.json({ message: 'Relacionamento removido com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar relacionamento:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});