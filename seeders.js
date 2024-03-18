import {Sala} from './models/Sala.js';
import {Aceita} from './models/Aceita.js';
import {Paga} from './models/Paga.js';
import {Consultorio} from './models/Consultorio.js';
import {Consulta} from './models/Consulta.js';
import {Convenio} from './models/Convenio.js';
import {DenTin} from './models/DenTin.js';
import {Dentista} from './models/Dentista.js';
import {Paciente} from './models/Paciente.js';
import {Receita} from './models/Receita.js';
import {Relatorio} from './models/Relatorio.js';
import {Atende} from './models/Atende.js';
import {gerarHashSenha} from './core/security.js';

async function seed() {
  try {

    await Convenio.bulkCreate([
      { nome: 'Convenio 1' },
      { nome: 'Convenio 2' },
      { nome: 'Convenio 3' },
  ]);

    await Dentista.bulkCreate([
      {
          nome: 'Lucas Gabriel',
          email: 'lucasgabriel@dentista.com',
          senha: 'senha123',
          cpf: '88988144023',
          rg: '176865421',
          cro: '123456769012345',
          especialidadeNN: 'Ortodontia',
          especialidade2: 'Periodontia',
          telefone: '1234567899',
          dataNasc: new Date(),
          sexo: 'M',
          uf: 'SP',
          cidade: 'São Paulo',
          bairro: 'Centro',
          rua: 'Rua A',
          endereco: '123',
          fkConvenio: 1
      },
      {
          nome: 'Daniel Zamboni',
          email: 'daniel@zambone.com',
          senha: 'senha456',
          cpf: '06645290039',
          rg: '316742179',
          cro: '68765432109876',
          especialidadeNN: 'Odontopediatria',
          especialidade2: 'Implantodontia',
          telefone: '0987654321',
          dataNasc: new Date(),
          sexo: 'F',
          uf: 'RJ',
          cidade: 'Rio de Janeiro',
          bairro: 'Copacabana',
          rua: 'Rua B',
          endereco: '456',
          fkConvenio: 2
      },
      {
          nome: 'Allyson Ryan',
          email: 'allyson@ryan.com',
          senha: 'senha476',
          cpf: '12805563077',
          rg: '356742179',
          cro: '28765432109873',
          especialidadeNN: 'Endodontia',
          especialidade2: 'Implantodontia',
          telefone: '0987354321',
          dataNasc: new Date(),
          sexo: 'F',
          uf: 'RJ',
          cidade: 'Rio de Janeiro',
          bairro: 'Copacabana',
          rua: 'Rua B',
          endereco: '456',
          fkConvenio: 2
      }
  ]);

  await Consultorio.bulkCreate([
    {
        nome: 'Consultorio 1',
        uf: 'SP',
        cidade: 'São Paulo',
        bairro: 'Centro',
        rua: 'Avenida Paulista',
        endereco: '123',
        logradouro: 'Sala 101',
        funcionamento: 'Segunda a Sexta, das 9h às 18h',
        complemento: 'Próximo ao metrô',
        referencia: 'Em frente ao shopping'
    },
    {
        nome: 'Consultorio 2',
        uf: 'RJ',
        cidade: 'Rio de Janeiro',
        bairro: 'Copacabana',
        rua: 'Avenida Atlântica',
        endereco: '456',
        logradouro: 'Sala 202',
        funcionamento: 'Segunda a Sexta, das 10h às 19h',
        complemento: 'Próximo à praia',
        referencia: 'Ao lado do hotel'
    },
]);
 



await Paciente.bulkCreate([
  {
      cpf: '12325678901',
      nome: 'João',
      email: 'joao@example.com',
      senha: await gerarHashSenha('123456'),
      telefone: '1234067890',
      dataNasc: '1990-01-01',
      sexo: 'M',
      cidade: 'São Paulo',
      uf: 'SP',
      bairro: 'Centro',
      rua: 'Rua A',
      endereco: '123',
      fkConvenio: 1,
      cardiaco: false,
      diabetico: false,
      alergico: null
  },
  {
      cpf: '98765432109',
      nome: 'Maria',
      email: 'mariaa@example.com',
      senha: await gerarHashSenha('654321'),
      telefone: '0967654321',
      dataNasc: '1995-02-02',
      sexo: 'F',
      cidade: 'Rio de Janeiro',
      uf: 'RJ',
      bairro: 'Copacabana',
      rua: 'Rua B',
      endereco: '456',
      fkConvenio: 2,
      cardiaco: true,
      diabetico: false,
      alergico: 'Amendoim'
  },
  {
      cpf: '71868179044',
      nome: 'Melk Victor',
      email: 'maria@example.com',
      senha: await gerarHashSenha('87654321'),
      telefone: '0987654421',
      dataNasc: '1995-02-02',
      sexo: 'M',
      cidade: 'Recife',
      uf: 'PE',
      bairro: 'Nova Descoberta',
      rua: 'Rua do bobo',
      endereco: '0',
      fkConvenio: 1,
      cardiaco: true,
      diabetico: false,
      alergico: 'Metal'
  }
]);

        await Sala.bulkCreate([
            { fkConsultorio: 1, num: '101' },
            { fkConsultorio: 1, num: '102' },
            { fkConsultorio: 2, num: '201' },
            { fkConsultorio: 2, num: '202' },
        ]);

        await Aceita.bulkCreate([
          { fkConvenio: 1, fkDentista: 1 },
          { fkConvenio: 2, fkDentista: 2 },
      ]);

      
    await Paga.bulkCreate([
      { fkPaciente: 1, fkConvenio: 1 },
      { fkPaciente: 2, fkConvenio: 2 },
    ]);


  try {
    const consultas = [
      {
        fkPaciente: 1,
        dataConsulta: new Date(),
        horaConsulta: '09:00',
        fkDentista: 1,
        tipo: 'Consulta de rotina',
        preco: 100.00,
        sala: 'Sala 1',
        status: 'Agendada',
        fkConsultorio: 1,
        comentario: 'Nenhum comentário',
        avaliacao: 5
      },
      // Add more consulta objects as needed
    ];

    await Consulta.bulkCreate([
      {
        fkPaciente: 1,
        dataConsulta: new Date(),
        horaConsulta: '09:00',
        fkDentista: 1,
        tipo: 'Consulta de rotina',
        preco: 100.0,
        sala: 'Sala 1',
        status: 'Agendada',
        fkConsultorio: 1,
        comentario: 'Nenhum comentário',
        avaliacao: 5
      },
      // Adicione mais registros de consulta aqui, se necessário
    ]);

    await DenTin.bulkCreate([
      { nome: 'Dente 1', status: 'Limpo', fkPaciente: 1 },
      { nome: 'Dente 2', status: 'Limpo', fkPaciente: 2 },
  ]);

  
  

await Receita.bulkCreate([
  {
      orientacoes: 'Orientações 1',
      medicamento: 'Medicamento 1',
      uso: 'Uso 1',
      fkConsulta: 1,
      fkCRO: '123456789012345'
  }
  // Add more seed data as needed
]);

await Relatorio.bulkCreate([
  {
      fkDentin: 1,
      historico: 'Histórico 1',
      dores: 'Dores 1',
      alimentacao: 'Alimentação 1',
      higiene: { escova: 'Sim', fioDental: 'Não' },
      processoDoenca: 'Processo Doença 1',
      cuidadoAparelho: 'Cuidado Aparelho 1',
      acidente: 'Acidente 1',
      dataEmissao: new Date(),
      dataReferencia: new Date()
  },
  {
      fkDentin: 2,
      historico: 'Histórico 2',
      dores: 'Dores 2',
      alimentacao: 'Alimentação 2',
      higiene: { escova: 'Sim', fioDental: 'Sim' },
      processoDoenca: 'Processo Doença 2',
      cuidadoAparelho: 'Cuidado Aparelho 2',
      acidente: 'Acidente 2',
      dataEmissao: new Date(),
      dataReferencia: new Date()
  },
]);

const atendes = [
  {
      fkDentista: 1,
      fkConsultorio: 1,
      seg: '08:00 - 12:00',
      ter: '08:00 - 12:00',
      qua: '08:00 - 12:00',
      qui: '08:00 - 12:00',
      sex: '08:00 - 12:00',
      sab: null,
      dom: null
  },
  {
      fkDentista: 2,
      fkConsultorio: 1,
      seg: '13:00 - 17:00',
      ter: '13:00 - 17:00',
      qua: '13:00 - 17:00',
      qui: '13:00 - 17:00',
      sex: '13:00 - 17:00',
      sab: null,
      dom: null
  },
  // Add more seed data as needed
];

// Insert seed data into the database
await Atende.bulkCreate(atendes);
    console.log('Seeders de consulta executado com sucesso!');
  } catch (error) {
    console.error('Erro ao executar seeders de consulta:', error);
  }

  } catch (error) {
    console.error('Erro ao executar seeders:', error);
  }

}

seed();

