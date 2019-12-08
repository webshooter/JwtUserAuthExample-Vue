import uuidv5 from "uuid/v5";

const buildGenerateChonkValue = ({ namespace } = {}) => ({ user, seed } = {}) => {
  if (!namespace) {
    throw new Error("generateChonk requires a valid namespace");
  }

  if (user === null || user === undefined) {
    throw new Error("generateChonkValue requires a valid user");
  }

  if (seed === null || seed === undefined) {
    throw new Error("generateChonkValue requires a valid seed");
  }

  return uuidv5(`${user}-${seed}`, namespace);
};

export default buildGenerateChonkValue;
