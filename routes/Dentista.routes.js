import router from 'express';
import { DentistaSchemaBase } from '../schemas/Dentista.schema.js';
import { DentistaSchemaCreate } from '../schemas/Dentista.schema.js';
import { DentistaSchemaDetails } from '../schemas/Dentista.schema.js';
import { Dentista } from '../models/Dentista.js';	
import { gerarHashSenha } from '../core/security.js';
import { Consulta } from '../models/Consulta.js';
import { Paciente } from '../models/Paciente.js';
import { DenTin } from '../models/DenTin.js';
import { Relatorio } from '../models/Relatorio.js';

export const dentistaRoute = router();

function normalizacao(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s/g, '');
}

dentistaRoute.get('/', async (req, res) => {
    try {
      const dentistas = await Dentista.findAll({
        attributes: { exclude:[ 'senha', 'cpf', 'rg', 'email', 'rua', 'endereco', 'bairro']}
      });
  
      const schema = DentistaSchemaBase.createBaseSchema();
      await Promise.all(dentistas.map(dentista => schema.validate(dentista)));
  
      res.json(dentistas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Rota para encontrar dentistas atuantes em determinada cidade
dentistaRoute.get('/cidade/:cidade', async (req, res) => {
    const cidadeBuscada = normalizacao(req.params.cidade)
    try {
      const dentistas = await Dentista.findAll({
        attributes: { exclude:[ 'senha', 'cpf', 'rg', 'email', 'rua', 'endereco', 'bairro']}
      });
      const dentistasFiltrados = dentistas.filter(dentista => normalizacao(dentista.cidade) === cidadeBuscada);

      const schema = DentistaSchemaBase.createBaseSchema();
      await Promise.all(dentistasFiltrados.map(dentista => schema.validate(dentista)));
  
      res.json(dentistasFiltrados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Rota para encontrar dentistas pelo seu nome
dentistaRoute.get('/nome/:nome', async (req, res) => {
    const nomeBuscado = normalizacao(req.params.nome)
    try {
      const dentistas = await Dentista.findAll({
        attributes: { exclude:[ 'senha', 'cpf', 'rg', 'email', 'rua', 'endereco', 'bairro']}
      });
      const dentistasFiltrados = dentistas.filter(dentista => normalizacao(dentista.nome) == nomeBuscado)

  
      const schema = DentistaSchemaBase.createBaseSchema();
      await Promise.all(dentistasFiltrados.map(dentista => schema.validate(dentista)));
  
      res.json(dentistasFiltrados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Rota para encontrar dentistas de determinadas especialidades
dentistaRoute.get('/especialidade/:especialidadeNN', async (req, res) => {
    const espBuscada = normalizacao(req.params.especialidadeNN)
    try {
      const dentistas = await Dentista.findAll({
        attributes: { exclude:[ 'senha', 'cpf', 'rg', 'email', 'rua', 'endereco', 'bairro']}
      });
      const dentistasFiltrados = dentistas.filter(dentista => normalizacao(dentista.especialidadeNN) || normalizacao(dentista.especialidade2)  == espBuscada)

  
      const schema = DentistaSchemaBase.createBaseSchema();
      await Promise.all(dentistasFiltrados.map(dentista => schema.validate(dentista)));
  
      res.json(dentistasFiltrados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


// Rota para criar um novo dentista
dentistaRoute.post('/', async (req, res) => {
    try {
        const dentistaSchema = DentistaSchemaCreate.createSchema();
        await dentistaSchema.validate(req.body);
        const hashSenha = await gerarHashSenha(req.body.senha)
        const dentista = {...req.body, senha:hashSenha}
        console.log('dentista', dentista);
        const dentistaatt = await Dentista.create(dentista);
        console.log('dentistaatt', dentistaatt);
        res.status(201).json({ message: 'Dentista criado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para obter detalhes de um dentista pelo ID
dentistaRoute.get('/:id', async (req, res) => {
    try {
        const dentistaId = req.params.id;
        const dentista = await Dentista.findByPk(dentistaId, {
            attributes: {
                exclude: ['senha', 'email']
            }
        });

        if (!dentista) {
            return res.status(404).json({ error: 'Dentista não encontrado.' });
        }
        const dentistaJson = dentista.toJSON();
        dentistaJson.ID = dentistaJson.pkDentista;
        delete dentistaJson.pkDentista;

        // Valide os dados retornados conforme o esquema base do dentista
        const schema = DentistaSchemaDetails.createSchema();
        await schema.validate(dentistaJson);

        res.json(dentistaJson);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rota para atualizar um dentista pelo ID
dentistaRoute.put('/:id', async (req, res) => {
    try {
        const dentistaId = req.params.id;
        const dentista = await Dentista.findByPk(dentistaId);
        if (!dentista) {
            return res.status(404).json({ error: 'Dentista não encontrado.' });
        }
        await dentista.update(req.body);

        res.json({ message: 'Dentista atualizado com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para deletar um dentista pelo ID
dentistaRoute.delete('/:id', async (req, res) => {
    try {
        const dentistaId = req.params.id;
        const dentista = await Dentista.findByPk(dentistaId);
        if (!dentista) {
            return res.status(404).json({ error: 'Dentista não encontrado.' });
        }
        await dentista.destroy(req.body);

        res.json({ message: 'Dentista removido com sucesso!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



dentistaRoute.get('/:id/consultas', async (req, res) => {
  try {
    const dentistaId = req.params.id;
    const dentista = await Dentista.findByPk(dentistaId);
    if (!dentista) {
      return res.status(404).json({ error: 'Dentista não encontrado.' });
    }
    const consultas = await Consulta.findAll({
      where: {
        fkDentista: dentistaId
      }
    });
    const consultasComPaciente = await Promise.all(consultas.map(async consulta => {
      const paciente = await Paciente.findByPk(consulta.fkPaciente);
      const dentin = await DenTin.findAll({where: {fkPaciente: consulta.fkPaciente}});
      const relatorio = await Relatorio.findOne({where: {fkDentin: dentin[0].pkDenTin}});
      return { ...consulta.toJSON(), paciente, relatorio };
    }));
    res.json(consultasComPaciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

