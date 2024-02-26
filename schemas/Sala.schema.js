import yup from 'yup';

export const ConsultorioSchemaBase = yup.object().shape({
    num: yup.string().required(),
    fkConsultorio: yup.number.required()
});