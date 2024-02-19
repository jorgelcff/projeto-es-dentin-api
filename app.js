import express from 'express';

import { pacienteRoute } from './routes/Paciente.routes.js';
import { userRoute } from './core/auth.js';


const app = express();

// Middleware para processar o corpo da requisição como JSON
app.use(express.json());

// Rotas relacionadas aos pacientes
app.use('/pacientes', pacienteRoute);
app.use('/usuarios', userRoute);

// Porta em que o servidor irá escutar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
