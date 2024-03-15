import yup from 'yup';


export const DentinSchemaBase = yup.object().shape({
    nome: yup.string().nullable(),
    status: yup.string().nullable(), 
});
   