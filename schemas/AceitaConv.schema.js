import yup from 'yup';

export const AceitaConvSchemaBase= yup.object().shape({
    fkConvenio: yup.number().required(),
    fkDentista: yup.number().required(),
    admissao: yup.date().nullable()
});