import yup from 'yup';

export const AceitaConvSchemaBase= yup.object().schape({
    fkConvenio: yup.number().required(),
    fkDentista: yup.number().required(),
    admissao: yup.date().nullable()
});