import router from 'express';
import { DentinSchemaBase } from "../schemas/Dentin.schema.js";
import { DenTin } from "../models/DenTin.js";

export const dentinRoute = router();

// O DenTIn é criado e deletado quando se cria e deleta o paciente no qual está associado

// Rota para obter DenTIns
dentinRoute.get('/', async (req, res) => {
    try {
        const dentins = await DenTin.findAll();
        res.json(dentins);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para obter detalhes de um DenTIn pelo ID do paciente
dentinRoute.get('/paciente/:idPaciente', async (req, res) => {
    const pacienteId = req.params.idPaciente;

    try {
        // Encontrar o DenTIn pelo ID
        const dentin = await DenTin.findOne({where: {fkPaciente: pacienteId}});

        // Verificar se o DenTIn existe
        if (!dentin) {
            return res.status(404).json({ error: 'DenTIn não encontrado.' });
        }

        // Retorna os detalhes do DenTIn
        res.json(dentin);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do DenTIn:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um DenTIn pelo ID do paciente
dentinRoute.put('/paciente/:idPaciente', async (req, res) => {
    const pacienteId = req.params.idPaciente;

    try {
        // Encontrar o DenTIn pelo ID
        const dentin = await DenTin.findOne({where: {fkPaciente: pacienteId}});

        // Verificar se o DenTIn existe
        if (!dentin) {
            return res.status(404).json({ error: 'DenTIn não encontrado.' });
        }

        // Validar dados recebidos do corpo da requisição com base no schema
        await DentinSchemaBase.validate(req.body);

        // Atualizar os dados do DenTIn no banco de dados
        await dentin.update(req.body);

        // Retorna os detalhes do DenTIn
        res.json({ message: 'DenTIn atualizado com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao atualizar DenTIn:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
