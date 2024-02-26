import yup from 'yup';

export const ConsultaSchemaBase = yup.object().shape({
    fkPaciente: yup.number().nullable(),
    fkDentista: yup.number().nullable(),
    dataConsulta: yup.date().required(),
    tipo: yup.string().required(), //Talvez fosse interessante fazer como oneOf, mas ai teria que fazer um mapeamento legal das opções
    orientacoes: yup.string().nullable(),
    preco: yup.number().nullable(), 
    sala: yup.string().required(), 
    status: yup.string().required(),
    fkConsultorio: yup.number().required()
});