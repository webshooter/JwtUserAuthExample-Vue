import uuid from "uuid/v4";
import validate from "uuid-validate";

const Id = Object.freeze({
  makeId: uuid,
  isValid: validate,
});

export default Id;
