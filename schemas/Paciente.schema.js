import * as yup from 'yup';

class PacienteSchemaBase {
  static createBaseSchema() {
    return yup.object().shape({
      nome: yup.string().required(),
      telefone: yup.string().required().matches(/^[0-9]+$/).min(10),
      dataNasc: yup.date().nullable(),
      sexo: yup.string().oneOf(['M', 'F', 'N']).default('N'),
      cidade: yup.string().required(),
      uf: yup.string().required(),
      fkConvenio: yup.number().nullable(),
      cardiaco: yup.boolean().nullable(),
      diabetico: yup.boolean().nullable(),
      alergico: yup.string().nullable(),
    });
  }
}

class PacienteSchemaDetails extends PacienteSchemaBase {
  static createSchema() {
    return this.createBaseSchema().concat(
      yup.object().shape({
        rua: yup.string().nullable(),
        endereco: yup.number().nullable(),
        bairro: yup.string().nullable()
  })
  );
}
}

class PacienteSchemaCreate extends PacienteSchemaBase {
  static createSchema() {
    return this.createBaseSchema().concat(
      yup.object().shape({
        senha: yup.string().required().min(6),
        email: yup.string().email().required(),
        rua: yup.string().nullable(),
        endereco: yup.number().nullable(),
        bairro: yup.string().nullable()
      })
    );
  }
}
export { PacienteSchemaBase, PacienteSchemaDetails, PacienteSchemaCreate};
