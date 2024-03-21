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
      { nome: 'Convenio 4' },
      { nome: 'Convenio 5' }
  ]);

    await Dentista.bulkCreate([
      {
          nome: 'Lucas Gabriel',
          email: 'lucasgabriel@dentista.com',
          senha: await gerarHashSenha('123456'),
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
          senha: await gerarHashSenha('123456'),
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
          senha: await gerarHashSenha('123456'),
          cpf: '12805563077',
          rg: '356742177',
          cro: '28765432109873',
          especialidadeNN: 'Endodontia',
          especialidade2: 'Implantodontia',
          telefone: '8987654321',
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
        nome: 'Kiev Gama',
        email: 'Kievgama@dentista.com',
        senha: 'senha1234',
        cpf: '52173237358',
        rg: '526979138',
        cro: '09876543214689',
        especialidadeNN: 'Ortodontia',
        especialidade2: 'Periodontia',
        telefone: '1234506789',
        dataNasc: new Date(),
        sexo: 'M',
        uf: 'DF',
        cidade: 'Brasília',
        bairro: 'Lago Norte',
        rua: 'Rua F',
        endereco: '091',
        fkConvenio: 1
    },
    {
      nome: 'Robson Fidalgo',
      email: 'RobsonBD@dentista.com',
      senha: 'senha404',
      cpf: '64641959658',
      rg: '383591897',
      cro: '01928374651109',
      especialidadeNN: 'Odontopediatria',
      especialidade2: 'Implantodontia',
      telefone: '0986542137',
      dataNasc: new Date(),
      sexo: 'M',
      uf: 'SP',
      cidade: 'São Paulo',
      bairro: 'Centro',
      rua: 'Rua Z',
      endereco: '852',
      fkConvenio: 3
  },
  {
    nome: 'Hermano perrelli',
    email: 'HermanoFSI@dentista.com',
    senha: 'senha52',
    cpf: '12671543627',
    rg: '947186242',
    cro: '56473829108349',
    especialidadeNN: 'Endodontia',
    especialidade2: 'Implantodontia',
    telefone: '6127384950',
    dataNasc: new Date(),
    sexo: 'M',
    uf: 'SP',
    cidade: 'São Paulo',
    bairro: 'Centro',
    rua: 'Rua T',
    endereco: '741',
    fkConvenio: 2
},
{
  nome: "Bruno Fernandes",
  email: "brunofernandes@gmail.com",
  senha: "senha123",
  cpf: "98765432198",
  rg: "83334321",
  cro: "98765432109876",
  especialidadeNN: "Cirurgia Oral e Maxilofacial",
  especialidade2: "Ortodontia",
  telefone: "11987555321",
  dataNasc: new Date(),
  sexo: "M",
  uf: "SP",
  cidade: "São Paulo",
  bairro: "Vila Mariana",
  rua: "Rua X",
  endereco: "123",
  fkConvenio: 4
},
{
  nome: "Carla Silva",
  email: "carla.silva@example.com",
  senha: "4enha12345",
  cpf: "12345678901",
  rg: "98765432",
  cro: "12345678901234",
  especialidadeNN: "Ortodontia",
  especialidade2: "Cirurgia Oral e Maxilofacial",
  telefone: "11997656321",
  dataNasc: new Date(),
  sexo: "F",
  uf: "RJ",
  cidade: "Rio de Janeiro",
  bairro: "Copacabana",
  rua: "Avenida Y",
  endereco: "456",
  fkConvenio: 3
},
{
  nome: "João Santos",
  email: "joao.santos@example.com",
  senha: "senha456",
  cpf: "98765432101",
  rg: "12345678",
  cro: "12345678904321",
  especialidadeNN: "Cirurgia Oral e Maxilofacial",
  especialidade2: "Implantodontia",
  telefone: "11976543210",
  dataNasc: new Date(),
  sexo: "M",
  uf: "SP",
  cidade: "São Paulo",
  bairro: "Moema",
  rua: "Rua Z",
  endereco: "789",
  fkConvenio: 4
},
{
  nome: "Ana Oliveira",
  email: "ana.oliveira@example.com",
  senha: "8senh45a789",
  cpf: "12309876543",
  rg: "87774321",
  cro: "54321098765432",
  especialidadeNN: "Ortodontia",
  especialidade2: "Cirurgia Oral e Maxilofacial",
  telefone: "11876543210",
  dataNasc: new Date(),
  sexo: "F",
  uf: "MG",
  cidade: "Belo Horizonte",
  bairro: "Savassi",
  rua: "Rua W",
  endereco: "321",
  fkConvenio: 5
}
  ]);

  await Consultorio.bulkCreate([
    {
        nome: 'Dentes Felizes Odontologia',
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
        nome: 'OdontoCare Prime',
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
    {
      nome: 'Sorriso Radiante Odontologia',
      uf: 'RJ',
      cidade: 'Rio de Janeiro',
      bairro: 'Copacabana',
      rua: 'Avenida Atlântica',
      endereco: '456',
      logradouro: 'Andar 10, Sala 1001',
      funcionamento: 'Segunda a Sexta, das 8h às 20h',
      complemento: 'Próximo à estação de metrô',
      referencia: 'Ao lado do hotel XYZ'
  },
  {
    nome: 'Dentes Saudáveis Odontologia',
    uf: 'MG',
    cidade: 'Belo Horizonte',
    bairro: 'Savassi',
    rua: 'Rua da Paz',
    endereco: '789',
    logradouro: 'Sala 202',
    funcionamento: 'Segunda a Sábado, das 10h às 19h',
    complemento: 'Próximo ao shopping ABC',
    referencia: 'Ao lado da praça central'
  },
  {
    nome: 'Dentes Saudáveis Odontologia',
    uf: 'MG',
    cidade: 'Belo Horizonte',
    bairro: 'Savassi',
    rua: 'Rua da Paz',
    endereco: '789',
    logradouro: 'Sala 202',
    funcionamento: 'Segunda a Sábado, das 10h às 19h',
    complemento: 'Próximo ao shopping ABC',
    referencia: 'Ao lado da praça central'
  }
]);
 



await Paciente.bulkCreate([
  {
      cpf: '12325678901',
      nome: 'João',
      email: 'joao@example.com',
      senha: await gerarHashSenha('123456'),
      telefone: '1234067895',
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
  },
  {
      cpf: '83750267108',
      nome: 'Vinícius Cardoso',
      email: 'ViniciusES@paciente.com',
      senha: await gerarHashSenha('system32'),
      telefone: '0967555321',
      dataNasc: '1995-02-02',
      sexo: 'M',
      cidade: 'Recife',
      uf: 'PE',
      bairro: 'Cidade Universitária',
      rua: 'Rua U',
      endereco: '963',
      fkConvenio: 1,
      cardiaco: false,
      diabetico: false,
      alergico: null
  },
  {
    cpf: '83750267111',
    nome: 'Maria Vitoria',
    email: 'mariazinha@example.com',
    senha: await gerarHashSenha('hashed55Senha123'),
    telefone: '0967654111',
    dataNasc: '1995-05-10',
    sexo: 'F',
    cidade: 'Rio de Janeiro',
    uf: 'RJ',
    bairro: 'Copacabana',
    rua: 'Avenida Atlântica',
    endereco: '456',
    fkConvenio: 4,
    cardiaco: true,
    diabetico: false,
    alergico: 'Amendoim'
},
{
  cpf: '83750267222',
  nome: 'Pedro',
  email: 'pedropontes@example.com',
  senha: await gerarHashSenha('hashed4Se5nha456'),
  telefone: '0967654222',
  dataNasc: '1988-12-20',
  sexo: 'M',
  cidade: 'São Paulo',
  uf: 'SP',
  bairro: 'Moema',
  rua: 'Rua Z',
  endereco: '789',
  fkConvenio: 5,
  cardiaco: false,
  diabetico: true,
  alergico: 'Penicilina'
},
{
  cpf: '83750267444',
  nome: 'Ana',
  email: 'ana2324@example.com',
  senha: await gerarHashSenha('hashed57Senha789'),
  telefone: '0967654333',
  dataNasc: '1980-07-15',
  sexo: 'F',
  cidade: 'Belo Horizonte',
  uf: 'MG',
  bairro: 'Savassi',
  rua: 'Rua da Paz',
  endereco: '321',
  fkConvenio: 4,
  cardiaco: true,
  diabetico: true,
  alergico: 'Penicilina'
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
      fkCRO: '28765432109873'
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

