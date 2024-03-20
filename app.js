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
import cors from 'cors';

const app = express();

app.use(cors())
// Middleware para processar o corpo da requisição como JSON
app.use(express.json());

// Rotas relacionadas aos pacientes
app.use('/pacientes', pacienteRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas aos dentistas
app.use('/dentistas', dentistaRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas aos convênios
app.use('/convenios', convenioRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas aos consultórios
app.use('/consultorios', consultorioRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas as salas
app.use('/salas', salaRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas as consultas
app.use('/consultas', consultaRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas as receitas
app.use('/receitas', receitaRoute);
app.use('/usuarios', userRoute);

// Rotas para relacionamento entre dentista e convênio
app.use('/aceita', aceitaRoute);
app.use('/usuarios', userRoute);

// Rotas para relacionamento entre dentista e consultório
app.use('/atende', atendeRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas ao DenTIn
app.use('/dentins', dentinRoute);
app.use('/usuarios', userRoute);

// Rotas relacionadas aos Relatórios
app.use('/relatorios', relatorioRoute);
app.use('/usuarios', userRoute);


// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
