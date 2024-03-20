import express from 'express';

import { pacienteRoute } from './routes/Paciente.routes.js';
import { userRoute } from './core/auth.js';
import { dentistaRoute } from './routes/Dentista.routes.js';
import { convenioRoute } from './routes/Convenio.route.js';
import { consultorioRoute } from './routes/Consultorio.route.js';
import { salaRoute } from './routes/Sala.route.js';
import { consultaRoute } from './routes/Consulta.route.js';
import { receitaRoute } from './routes/Receita.route.js';
import { aceitaRoute } from './routes/AceitaConv.route.js';
import { atendeRoute } from './routes/AtendeConsul.route.js';
import { dentinRoute } from './routes/DenTin.route.js';
import { relatorioRoute } from './routes/Relatorio.route.js';
import { pagaRoute } from './routes/PagaConv.route.js';

const app = express();

// Middleware para processar o corpo da requisição como JSON
app.use(express.json());

// Rotas relacionadas aos pacientes
app.use('/pacientes', pacienteRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas aos dentistas
app.use('/dentistas', dentistaRoute);

// Rotas relacionadas aos convênios
app.use('/convenios', convenioRoute);

// Rotas relacionadas aos consultórios
app.use('/consultorios', consultorioRoute);

// Rotas relacionadas as salas
app.use('/salas', salaRoute);

// Rotas relacionadas as consultas
app.use('/consultas', consultaRoute);

// Rotas relacionadas as receitas
app.use('/receitas', receitaRoute);

// Rotas para relacionamento entre dentista e convênio
app.use('/aceita', aceitaRoute);

// Rotas para relacionamento entre dentista e consultório
app.use('/atende', atendeRoute);

// Rotas relacionadas ao DenTIn
app.use('/dentins', dentinRoute);

// Rotas relacionadas aos Relatórios
app.use('/relatorios', relatorioRoute);

// Rotas para relacionamento entre paciente e convênio
app.use('/paga', pagaRoute);

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
