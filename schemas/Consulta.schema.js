import yup from 'yup';

export const ConsultaSchemaBase = yup.object().shape({
    fkPaciente: yup.number().nullable(),
    fkDentista: yup.number().nullable(),
    dataConsulta: yup.date().required(),
    horaConsulta: yup.string().required().matches(/^([0-2][0-9]|2[0-3]):[0-5][0-9]-([0-2][0-9]|2[0-3]):[0-5][0-9]$/).min(11),
    tipo: yup.string().oneOf(["Check-up", "Exame", "Procedimento estético ", "Cirurgia", "Tratamento patológico","Aparelho ortodôntico", "Não especificado"]).default("Não especificado"), //Talvez fosse interessante fazer como oneOf, mas ai teria que fazer um mapeamento legal das opções
    preco: yup.number().nullable(), 
    sala: yup.string().required(), 
    status: yup.string().oneOf(["Agendada", "Cancelada", "Reagendada", "Concluida"]).default("Agendada"), 
    fkConsultorio: yup.number().required(),
    comentario: yup.string().nullable(),
    avaliacao: yup.number().oneOf([1, 2, 3, 4, 5]).nullable()
});