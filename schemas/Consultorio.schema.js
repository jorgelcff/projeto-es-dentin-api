import yup from 'yup';

export const ConsultorioSchemaBase = yup.object().shape({
    salas: yup.string().required(), //Isso daqui realmente devia ser uma entidade fraca com uma fk pra consultório, porquê ela é extremamente composta
    cidade: yup.string().required(),
    uf: yup.string().required(),
    bairro: yup.string().required(),
    rua: yup.string().required(),
    endereco: yup.number().required(), //Isso devia ser str
    logradouro: yup.string().required(),
    complemento: yup.string().nullable(),
    referencia: yup.string().nullable(),
    horarios: yup.string().required(),
});