import {Aceita} from './models/Aceitas.js';
import {Atende} from './models/Atende.js';
import {Atendido} from './models/Atendido.js';
import {Consulta} from './models/Consulta.js';
import {Consultorio} from './models/Consultorio.js';
import {Convenio} from './models/Convenio.js';
import {DenTin} from './models/DenTin.js';
import {Dentista} from './models/Dentista.js';
import {Paciente} from './models/Paciente.js';
import {Receita} from './models/Receita.js';
import {Relatorio} from './models/Relatorio.js';

import {sequelize} from './config/database.js';


async function sincronizarBanco(){
  try{ 
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    await sequelize.sync({force: true});
    console.log('Tabelas criadas');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

sincronizarBanco();