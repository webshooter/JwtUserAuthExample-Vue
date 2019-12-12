import validator from "email-validator";

const Email = Object.freeze({
  validate: validator.validate,
});

export default Email;
