import yup from 'yup';

export const PacienteSchemaBase = yup.object().shape({
  nome: yup.string().required(),
  user: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().required().min(6),
  telefone: yup.string().required().matches(/^[0-9]+$/).min(10),
  dataNasc: yup.date().nullable(),
  sexo: yup.string().oneOf(['M', 'F', 'N']).default('N'),
  cidade: yup.string().nullable(),
  uf: yup.string().nullable(),
  bairro: yup.string().nullable(),
  rua: yup.string().nullable(),
  endereco: yup.number().nullable(),
  fkConvenio: yup.number().nullable(),
  cardiaco: yup.boolean().required(),
  diabetico: yup.boolean().required(),
  alergico: yup.string().required(),
});
