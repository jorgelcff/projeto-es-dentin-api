import yup from 'yup';

export const AtendeConsulSchemaBase = yup.object().shape({
    fkDentista: yup.number().required(),
    fkConsultorio: yup.number().required(),
    expediente: yup.string().required().matches(/^([0-2][0-9]|2[0-3]):[0-5][0-9]-([0-2][0-9]|2[0-3]):[0-5][0-9]$/).min(11)
});