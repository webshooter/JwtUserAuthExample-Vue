const buildMakeChonk = ({ generateChonkValue, namespace } = {}) => ({ user, seed }) => {
  if (!namespace) {
    throw new Error("Chonk requires a valid namespace");
  }

  if (!seed) {
    throw new Error("Chonk requires a valid seed");
  }

  if (!generateChonkValue || typeof generateChonkValue !== "function") {
    throw new Error("Chonk requires a valid generator");
  }

  const chonk = generateChonkValue({ namespace, seed, user });
  const timestamp = Date.now();

  return {
    getUser: () => user,
    getNamespace: () => namespace,
    getSeed: () => seed,
    getChonk: () => chonk,
    getTimestamp: () => timestamp,
    getStatus: () => (chonk ? "success" : "error"),
  };
};

export default buildMakeChonk;
