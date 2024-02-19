import timezone from 'timezone/loaded.js';
import { DateTime, Duration } from 'luxon';
import jwt from 'jsonwebtoken';
import { Paciente } from '../models/Paciente.js';
import { Dentista } from '../models/Dentista.js';
import { verificarSenha } from '../core/security.js';
import express from 'express';
import {settings} from './config.js';

export const userRoute = express.Router();

userRoute.post('/login', async (req, res) => {
  const { email, senha, plataforma } = req.body;

  try {

    if (!email || !senha || !plataforma) {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }
    const usuario = await autenticar(email, senha, plataforma);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = criarTokenAcesso(usuario.id);
    res.json({ access_token: token });
    
  } catch (error) {
    console.error('Erro ao autenticar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export async function autenticar(email, senha, plataforma = 'app') {
  const sp = timezone('America/Sao_Paulo');
  let usuario = null;

  if (plataforma === 'app') {
    usuario = await Paciente.findOne({ where: { email } });
  }

  if (plataforma === 'web') {
    usuario = await Dentista.findOne({ where: { email } });
  }

  if (!usuario) {
    return null;
  }

  console.log('senha', senha, usuario.senha)
  if (!verificarSenha(senha, usuario.senha)) {
    return null;
  }

  return usuario;
}

export function criarTokenAcesso(sub) {
  const sp = timezone('America/Sao_Paulo');
  const expira = DateTime.now().setZone(sp).plus(({ minutes: 60 * 7 * 24  }));

  const payload = {
    type: 'access_token',
    exp: expira.toSeconds(),
    iat: Math.floor(DateTime.now().setZone(sp).toMillis() / 1000),
    sub: String(sub)
  };

  return jwt.sign(payload, settings.JWT_SECRET, { algorithm: settings.ALGORITHM });
}

