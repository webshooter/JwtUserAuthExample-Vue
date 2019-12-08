import { createChonk } from "../behaviors";

const makeGetChonk = () => httpRequest => {
  const { user, body } = httpRequest;
  const { seed } = body;
  const headers = {
    "Content-Type": "application/json",
  };
  const statusCode = 200;
  const {
    getUser,
    getNamespace,
    getSeed,
    getChonk,
    getTimestamp,
    getStatus,
  } = createChonk({ user, seed });

  return {
    headers,
    statusCode,
    body: {
      chonk: {
        user: getUser(),
        namespace: getNamespace(),
        seed: getSeed(),
        chonk: getChonk(),
        timestamp: getTimestamp(),
        status: getStatus(),
      },
    },
  };
};

export default makeGetChonk;
