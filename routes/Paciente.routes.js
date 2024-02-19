import router from 'express';
import { PacienteSchemaBase } from '../schemas/Paciente.schema.js';
import { Paciente } from '../models/paciente.js';	
import { gerarHashSenha } from '../core/security.js';


export const pacienteRoute = router();

pacienteRoute.get('/', async (req, res) => {
  try {
        const pacientes = await Paciente.findAll();
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo paciente
pacienteRoute.post('/', async (req, res) => {
    try {
        
        await PacienteSchemaBase.validate(req.body);
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

// Rota para obter detalhes de um paciente pelo ID
pacienteRoute.get('/:id', (req, res) => {
    const pacienteId = req.params.id;
    const paciente = pacientes.find(p => p.id === pacienteId);

    if (!paciente) {
        return res.status(404).json({ error: 'Paciente não encontrado.' });
    }

    res.json(paciente);
});

// Rota para atualizar um paciente pelo ID
pacienteRoute.put('/:id', async (req, res) => {
    try {
        const pacienteId = req.params.id;
        const pacienteIndex = pacientes.findIndex(p => p.id === pacienteId);

        if (pacienteIndex === -1) {
            return res.status(404).json({ error: 'Paciente não encontrado.' });
        }

        // Validar dados recebidos do corpo da requisição com base no schema
        await pacienteSchema.validate(req.body);

        // Atualizar dados do paciente na lista
        pacientes[pacienteIndex] = { ...pacientes[pacienteIndex], ...req.body };

        res.json({ message: 'Paciente atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um paciente pelo ID
pacienteRoute.delete('/:id', (req, res) => {
    const pacienteId = req.params.id;
    const pacienteIndex = pacientes.findIndex(p => p.id === pacienteId);

    if (pacienteIndex === -1) {
        return res.status(404).json({ error: 'Paciente não encontrado.' });
    }

    // Remover paciente da lista
    pacientes.splice(pacienteIndex, 1);

    res.json({ message: 'Paciente removido com sucesso!' });
});

