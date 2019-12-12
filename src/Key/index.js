import uuidv5 from "uuid/v5";
import bcrypt from "bcryptjs";
import validateUuid from "uuid-validate";
import Id from "../Id";

// eslint-disable-next-line import/named
import { domain } from "../config";

const namespace = uuidv5(domain, uuidv5.DNS);

const hashKey = async ({ key }) => {
  if (!validateUuid(key)) {
    throw new Error("Hash requires a valid key");
  }
  return bcrypt.hash(key, 10);
};

const makeKey = async ({ user }) => {
  if (!Id.isValid(user)) {
    throw new Error("Key requires a valid user");
  }
  return uuidv5(`${user}:${Date.now()}`, namespace);
};

const validateKey = async ({ key, keyHash }) => bcrypt.compare(key, keyHash);

const Key = Object.freeze({
  makeKey,
  hashKey,
  validateKey,
});

export default Key;
