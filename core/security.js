
import bcrypt from 'bcryptjs';

export async function verificarSenha(senha, hashSenha) {
  try {
    return await bcrypt.compare(senha, hashSenha);
  } catch (error) {
    console.error('Erro ao verificar senha:', error);
    throw new Error('Erro ao verificar senha');
  }
}

export async function gerarHashSenha(senha) {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(senha, saltRounds);
    console.log('hash', hash)
    return hash;
  } catch (error) {
    console.error('Erro ao gerar hash da senha:', error);
    throw new Error('Erro ao gerar hash da senha');
  }
}
