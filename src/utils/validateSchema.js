import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export function validateSchema(responseBody, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(responseBody);

  return {
    valid,
    errors: validate.errors,
  };
}
