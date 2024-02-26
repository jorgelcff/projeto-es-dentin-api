import router from 'express';
import { DentistaSchemaBase } from '../schemas/Paciente.schema.js';
import { Dentista } from '../models/paciente.js';	
import { gerarHashSenha } from '../core/security.js';

export const dentistaRoute = router();
