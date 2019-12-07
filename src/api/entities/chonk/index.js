const buildMakeChonk = ({ user } = {}) => ({ generateChonk, namespace }) => {
  if (!namespace) {
    throw new Error("Chonk requires a valid namespace");
  }

  if (!generateChonk || typeof generateChonk !== "function") {
    throw new Error("Chonk requires a valid generator");
  }

  const chonk = generateChonk({ namespace });
  const timestamp = Date.now();

  return {
    getUser: () => user,
    getNamespace: () => namespace,
    getChonk: () => chonk,
    getTimestamp: () => timestamp,
    getStatus: () => (chonk ? "success" : "error"),
  };
};

export default buildMakeChonk;