import yup from 'yup';

export const PagaConvSchemaBase= yup.object().schape({
    fkConvenio: yup.number().required(),
    fkPaciente: yup.number().required(),
    admissao: yup.date().nullable()
});