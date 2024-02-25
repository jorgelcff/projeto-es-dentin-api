import yup from 'yup';

export const ReceitaSchemaBase = yup.object().shape({
    orientacoes: yup.string().required(),
    medicamento: yup.string().nullable(),
    uso: yup.string().nullable(),
    fkConsulta: yup.number().required(),
    fkCRO: yup.number().required()
});
  