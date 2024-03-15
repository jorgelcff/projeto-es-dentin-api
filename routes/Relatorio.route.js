import router from 'express';
import { RelatorioSchemaBase } from "../schemas/Relatorio.schema.js";
import { Relatorio } from "../models/Relatorio.js";
import { DenTin } from '../models/DenTin.js';

export const relatorioRoute = router();

// Rota criar Relatórios
relatorioRoute.post('/', async (req, res) => {
    try {
        await RelatorioSchemaBase.validate(req.body);
        const relatorio = {...req.body}
        console.log('relatorio', relatorio);
        const relatorioatt = await Relatorio.create(relatorio);
        console.log('relatorioatt', relatorioatt);

        // Calcule o peso total das respostas
        const pesoTotal = calcularPesoTotal(relatorio.frequenciaEscovacao, relatorio.usoFioDental, relatorio.alimentacao, relatorio.dores);

        // Determine o status do personagem
        const status = pesoTotal >= 4 ? 'Limpo' : 'Sujo';

        // Atualize o status do personagem no banco de dados
        await DenTin.update({ status: status }, { where: { pkDenTin: relatorio.fkDentin } });

        res.status(201).json({ message: 'Relatório criado com sucesso!', statusDenTin: status });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Função para calcular o peso total das respostas
function calcularPesoTotal(escovacao, fioDental, alimentacao, dor) {
    const pesoEscovado = pesoResposta(escovacao);
    const pesoFioDental = pesoResposta(fioDental);
    const pesoAlimentacao = pesoResposta(alimentacao);
    const pesoDor = pesoResposta(dor);

    return pesoEscovado + pesoFioDental + pesoAlimentacao + pesoDor;
}

// Função para calcular o peso de uma resposta individual
function pesoResposta(resposta) {
    switch (resposta) {
        case '1 vez':
        case 'Não tenho usado':
        case 'Principalmente alimentos não saudáveis':
        case 'Sim, dor persistente':
            return 0;
        case '2 a 3 vezes':
        case 'Algumas vezes após a escovação':
        case 'Algumas refeições saudáveis, outras nem tanto':
        case 'Um leve desconforto ocasional':
            return 1;
        case '4 ou mais vezes':
        case 'Sim, com regularidade':
        case 'Saudável e equilibrada':
        case 'Não, sem dor':
            return 2;
        default:
            return 0;
    }
}


// Rota para obter Relatórios
relatorioRoute.get('/', async (req, res) => {
    try {
        const relatorios = await Relatorio.findAll();
        res.json(relatorios);
    } catch (error) {
        res.status(500).json({ error: error.message });
  }
});

// Rota para obter detalhes dos Relatórios pelo ID
relatorioRoute.get('/:id', async (req, res) => {
    const relatorioId = req.params.id;

    try {
        // Encontrar o Relatório pelo ID
        const relatorio = await Relatorio.findByPk(relatorioId);

        // Verificar se o Relatório existe
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        // Retorna os detalhes do Relatório
        res.json(relatorio);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do Relatório:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para atualizar um Relatório pelo ID
relatorioRoute.put('/:id', async (req, res) => {
    const relatorioId = req.params.id;

    try {
        // Encontrar o Relatório pelo ID
        const relatorio = await Relatorio.findByPk(relatorioId);

        // Verificar se o Relatório existe
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        // Validar dados recebidos do corpo da requisição com base no schema
        await relatorio.validate(req.body);

        // Atualizar os dados do Relatório no banco de dados
        await relatorio.update(req.body);

        // Retorna os detalhes do Relatório
        res.json({ message: 'Relatório atualizado com sucesso!' });

    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do Relatório:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para deletar Relatório pelo ID
relatorioRoute.delete('/:id', async (req, res) => {
    const relatorioId = req.params.id;

    try {
        // Encontrar o Relatório pelo ID
        const relatorio = await Relatorio.findByPk(relatorioId);

        // Verificar se o Relatório existe
        if (!relatorio) {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        // Remover o Relatório do banco de dados
        await relatorio.destroy();

        // Retorna os detalhes do Relatório
        res.json({ message: 'Relatório removido com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar Relatórios:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para obter detalhes dos Relatórios de um DenTIn pelo ID
relatorioRoute.get('/dentin/:idDentin', async (req, res) => {
    const dentinId = req.params.idDentin;

    try {
        // Encontrar o Relatório pelo ID
        const dentin = await Relatorio.findAll({where: {fkDentin: dentinId}});

        // Verificar se o Relatório existe
        if (!dentin) {
            return res.status(404).json({ error: 'DenTIn não encontrado.' });
        }

        // Retorna os detalhes do Relatório
        res.json(dentin);
    } catch (error) {
        // Tratar erros
        console.error('Erro ao obter detalhes do DenTIn:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

// Rota para deletar todos os Relatórios de um DenTIn pelo ID
relatorioRoute.delete('/dentin/:idDentin', async (req, res) => {
    const dentinId = req.params.idDentin;

    try {
        // Encontrar o Relatório pelo ID
        const relatorios = await Relatorio.findAll({where: {fkDentin: dentinId}});

        // Verificar se o Relatório existe
        if (!relatorios) {
            return res.status(404).json({ error: 'Relatório não encontrado.' });
        }

        // Iterar sobre os relatórios e excluí-los individualmente
        await Promise.all(relatorios.map(async (relatorio) => {
            await relatorio.destroy();
        }));

        // Retorna os detalhes do Relatório
        res.json({ message: 'Relatórios removidos com sucesso!' });
    } catch (error) {
        // Tratar erros
        console.error('Erro ao deletar Relatórios:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});




/*
// Endpoint para receber as respostas do usuário e calcular o status do personagem
router.post('/calcular-status/:idDentin', async (req, res) => {
    try {
        // Receba as respostas do usuário
        const dentinId = req.params.idDentin;

        // Calcule o peso total das respostas
        const pesoTotal = calcularPesoTotal(escovado, fioDental, alimentacao, dor);

        // Determine o status do personagem
        const status = pesoTotal >= 4 ? 'Limpo' : 'Sujo';

        // Atualize o status do personagem no banco de dados
        await DenTin.update({ status: status }, { where: { id: req.params.id } });

        // Retorne o status do personagem para o frontend
        res.json({ status: status });
    } catch (error) {
        console.error('Erro ao calcular o status do personagem:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});
*/
