import router from 'express';
import { DentistaSchemaBase } from '../schemas/Dentista.schema.js';
import { DentistaSchemaCreate } from '../schemas/Dentista.schema.js';
import { DentistaSchemaDetails } from '../schemas/Dentista.schema.js';
import { Dentista } from '../models/Dentista.js';	
import { gerarHashSenha } from '../core/security.js';

export const dentistaRoute = router();

dentistaRoute.get('/', async (req, res) => {
    try {
      const dentistas = await Dentista.findAll({
        attributes: { exclude:[ 'senha', 'cpf', 'rg', 'email', 'rua', 'endereco', 'bairro']}
      });
  
      const schema = DentistaSchemaBase.createBaseSchema();
      await Promise.all(dentistas.map(dentista => schema.validate(dentista)));
  
      res.json(dentistas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Rota para criar um novo dentista
dentistaRoute.post('/', async (req, res) => {
    try {
        const dentistaSchema = DentistaSchemaCreate.createSchema();
        await dentistaSchema.validate(req.body);
        const hashSenha = await gerarHashSenha(req.body.senha)
        const dentista = {...req.body, senha:hashSenha}
        console.log('dentista', dentista);
        const dentistaatt = await Dentista.create(dentista);
        console.log('dentistaatt', dentistaatt);
        res.status(201).json({ message: 'Dentista criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um dentista pelo ID
dentistaRoute.get('/:id', async (req, res) => {
    try {
        const dentistaId = req.params.id;
        const dentista = await Dentista.findByPk(dentistaId, {
            attributes: {
                exclude: ['senha', 'email']
            }
        });

        if (!dentista) {
            return res.status(404).json({ error: 'Dentista não encontrado.' });
        }
        const dentistaJson = dentista.toJSON();
        dentistaJson.ID = dentistaJson.pkDentista;
        delete dentistaJson.pkDentista;

        // Valide os dados retornados conforme o esquema base do dentista
        const schema = DentistaSchemaDetails.createSchema();
        await schema.validate(dentistaJson);

        res.json(dentistaJson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar um dentista pelo ID
dentistaRoute.put('/:id', async (req, res) => {
    try {
        const dentistaId = req.params.id;
        const dentista = await Dentista.findByPk(dentistaId);
        if (!dentista) {
            return res.status(404).json({ error: 'Dentista não encontrado.' });
        }
        await dentista.update(req.body);

        res.json({ message: 'Dentista atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um dentista pelo ID
dentistaRoute.delete('/:id', async (req, res) => {
    try {
        const dentistaId = req.params.id;
        const dentista = await Dentista.findByPk(dentistaId);
        if (!dentista) {
            return res.status(404).json({ error: 'Dentista não encontrado.' });
        }
        await dentista.destroy(req.body);

        res.json({ message: 'Dentista removido com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
