import yup from 'yup';


export const DentinSchemaBase = yup.object().shape({
    nome: yup.string().required,
    status: yup.string().required //Aqui talvez seja um oneOf
});
   