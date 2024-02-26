import yup from 'yup';

export const ConsultorioSchemaBase = yup.object().shape({
    cidade: yup.string().required(),
    uf: yup.string().required(),
    bairro: yup.string().required(),
    rua: yup.string().required(),
    endereco: yup.string().required(), 
    logradouro: yup.string().required(),
    complemento: yup.string().nullable(),
    referencia: yup.string().nullable(),
    funcionamento: yup.string().required(),
});