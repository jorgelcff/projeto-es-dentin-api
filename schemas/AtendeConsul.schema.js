import yup from 'yup';

export const AtendeConsulSchemaBase = yup.object().shape({
    fkDentista: yup.number().nullable(),
    fkConsultorio: yup.number().required(),
    expediente: yup.string().required()
});