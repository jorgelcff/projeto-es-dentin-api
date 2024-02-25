import yup from 'yup';

export const AceitaConvSchemaBase= yup.object().schape({
    fkConvenio: yup.number().nullable(),
    fkDentista: yup.number().nullable(),
    admissao: yup.date().required()
});