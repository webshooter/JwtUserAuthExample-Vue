const buildMakeChonk = ({ generateChonk, namespace } = {}) => ({ user, seed }) => {
  if (!namespace) {
    throw new Error("Chonk requires a valid namespace");
  }

  if (!seed) {
    throw new Error("Chonk requires a valid seed");
  }

  if (!generateChonk || typeof generateChonk !== "function") {
    throw new Error("Chonk requires a valid generator");
  }

  const chonk = generateChonk({ namespace, seed, user });
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