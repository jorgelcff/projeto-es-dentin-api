import yup from 'yup';

export const RelatorioSchemaBase = yup.object().shape({
    fkDentin: yup.number().required(),
    historico: yup.string().nullable(),
    dores: yup.string().required(),
    alimentacao: yup.string().required(),
    higiene: yup.object().shape({
        frequenciaEscovacao: yup.string().nullable(),
        usoFioDental: yup.string().nullable()
    }).required(),
        processoDoenca: yup.string().nullable(),
    cuidadoAparelho: yup.string().nullable(),
    acidente: yup.string().nullable(),
    dataEmissao: yup.date().required(),
    dataReferencia: yup.date().required()
});
  