import yup from 'yup';

export const SalaSchemaBase = yup.object().shape({
    num: yup.string().required(),
    fkConsultorio: yup.number().required()
});