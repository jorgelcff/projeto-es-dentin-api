import yup from 'yup';

export const RelatorioSchemaBase = yup.object().shape({
    fkDentin: yup.number().required(),
    historico: yup.string().required(),
    dores: yup.string().required(),
    alimentacao: yup.string().required(),
    higiene: yup.string().required(),
    processoDoenca: yup.string().nullable(),
    cuidadoAparelho: yup.string().nullable(),
    acidente: yup.string().nullable(),
    dataEmissao: yup.date().required(),
    dataReferencia: yup.date().required()
});
  