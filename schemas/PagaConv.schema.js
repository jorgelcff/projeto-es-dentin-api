import yup from 'yup';

export const PagaConvSchemaBase= yup.object().shape({
    fkConvenio: yup.number().required(),
    fkPaciente: yup.number().required(),
});