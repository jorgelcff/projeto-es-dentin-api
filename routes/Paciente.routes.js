import router from 'express';
import {PacienteSchemaBase} from '../schemas/Paciente.schema.js';
import {PacienteSchemaCreate} from '../schemas/Paciente.schema.js';
import {PacienteSchemaDetails} from '../schemas/Paciente.schema.js';
import { Paciente } from '../models/Paciente.js';	
import { gerarHashSenha } from '../core/security.js';


export const pacienteRoute = router();

function normalizacao(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s/g, '');
}

pacienteRoute.get('/', async (req, res) => {
    try {
      const pacientes = await Paciente.findAll({
        attributes: { exclude:[ 'senha', 'email', 'rua', 'endereco', 'bairro']}
      });
  
      const schema = PacienteSchemaBase.createBaseSchema();
      await Promise.all(pacientes.map(paciente => schema.validate(paciente)));
  
      res.json(pacientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Rota para criar um novo paciente
pacienteRoute.post('/', async (req, res) => {
    try {
        const pacienteSchema = PacienteSchemaCreate.createSchema();
        await pacienteSchema.validate(req.body);
        const hashSenha = await gerarHashSenha(req.body.senha)
        const paciente = {...req.body, senha:hashSenha}
        console.log('paciente', paciente);
        const pacienteatt = await Paciente.create(paciente);
        console.log('pacienteatt', pacienteatt);
        res.status(201).json({ message: 'Paciente criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Rota para encontrar pacientes pelo seu nome
pacienteRoute.get('/nome/:nome', async (req, res) => {
    const nomeBuscado = normalizacao(req.params.nome)
    try {
      const pacientes = await Paciente.findAll({
        attributes: { exclude:[ 'senha', 'cpf', 'email', 'rua', 'endereco', 'bairro']}
      });
      const pacientesFiltrados = pacientes.filter(paciente => normalizacao(paciente.nome) == nomeBuscado)

  
      const schema = PacienteSchemaBase.createBaseSchema();
      await Promise.all(pacientesFiltrados.map(paciente => schema.validate(paciente)));
  
      res.json(pacientesFiltrados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


// Rota para obter detalhes de um paciente pelo ID
pacienteRoute.get('/:id', async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const paciente = await Paciente.findByPk(pacienteId, {
            attributes: {
                exclude: ['senha', 'email']
            }
        });

        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado.' });
        }
        const pacienteJson = paciente.toJSON();
        pacienteJson.ID = pacienteJson.pkPaciente;
        delete pacienteJson.pkPaciente;

        // Valide os dados retornados conforme o esquema base do paciente
        const schema = PacienteSchemaDetails.createSchema();
        await schema.validate(pacienteJson);

        res.json(pacienteJson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar um paciente pelo ID
pacienteRoute.put('/:id', async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const paciente = await Paciente.findByPk(pacienteId);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado.' });
        }
        await paciente.update(req.body);

        res.json({ message: 'Paciente atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um paciente pelo ID
pacienteRoute.delete('/:id', async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const paciente = await Paciente.findByPk(pacienteId);
        if (!paciente) {
            return res.status(404).json({ error: 'Paciente não encontrado.' });
        }
        await paciente.destroy(req.body);

        res.json({ message: 'Paciente removido com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

