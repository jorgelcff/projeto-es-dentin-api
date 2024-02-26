import yup from 'yup';

export const ConvenioSchemaBase = yup.object().shape({
    nome: yup.string().required()
    //Ainda acho interessante adicionar CNPJ e desconto, depois a gente vê
});