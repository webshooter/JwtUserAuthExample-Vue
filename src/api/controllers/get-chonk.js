import logger from "../../logger";
import { createChonk } from "../behaviors";

const makeGetChonk = () => async httpRequest => {
  const headers = {
    "Content-Type": "application/json",
  };

  let statusCode;
  let responseBody;

  // TODO: replace temp user value with auth'd user id
  try {
    const { user = "ABCDE12345", body } = httpRequest;
    const { seed } = body;
    const {
      getUser,
      getNamespace,
      getSeed,
      getChonk,
      getTimestamp,
      getStatus,
    } = createChonk({ user, seed });

    statusCode = 200;
    responseBody = {
      chonk: {
        user: getUser(),
        namespace: getNamespace(),
        seed: getSeed(),
        chonk: getChonk(),
        timestamp: getTimestamp(),
        status: getStatus(),
      },
    };
  } catch (e) {
    // TODO: get trace info into error logs
    logger.error(e.message);

    statusCode = 500;

    // TODO: curate the returned error messages here
    responseBody = {
      error: e.message,
    };
  }

  return {
    headers,
    statusCode,
    body: responseBody,
  };
};

export default makeGetChonk;
