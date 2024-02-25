import yup from 'yup';

export const ConsultaSchemaBase = yup.object().shape({
    fkPaciente: yup.number().nullable(),
    fkDentista: yup.number().nullable(),
    dataConsulta: yup.date().required(),
    tipo: yup.string().required(), //Talvez fosse interessante fazer como oneOf, mas ai teria que fazer um mapeamento legal das opções
    orientacoes: yup.string().required(), //Essa col é pra algo com "Ir com máscara", "Jejum 8hrs", devia ser opcional tem que alterar no db
    preco: yup.number().required(), //Também devia ser nullable, tem que mudar no db
    sala: yup.string().required(), //Não vi necessidade de usar matches porquê tem salas identificadas sem ser por núm
    status: yup.string().required(),
    fkConsultorio: yup.number().required()
});