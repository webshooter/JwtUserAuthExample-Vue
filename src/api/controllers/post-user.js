const makePostUser = ({ addUser, adminApiKey }) => async httpRequest => {
  const sourceIp = httpRequest.ip;
  const { email, password, source = {} } = httpRequest.body;
  const {
    "x-api-key": apiKey,
    "User-Agent": sourceBrowser,
    Referrer: sourceReferrer,
  } = httpRequest.headers;
  const headers = {
    "Content-Type": "application/json",
  };

  console.log(adminApiKey, apiKey);
  console.log(httpRequest);

  if (!adminApiKey || !apiKey) {
    return {
      headers,
      statusCode: 401,
      error: "Requires authentication",
    };
  }

  if (adminApiKey !== apiKey) {
    return {
      headers,
      statusCode: 403,
      error: "Unauthorized operation",
    };
  }

  source.ip = sourceIp;
  source.browser = sourceBrowser;
  if (sourceReferrer) {
    source.referrer = sourceReferrer;
  }

  const { id, email: userEmail } = await addUser({ email, password, source });

  const body = {
    user: { id, email: userEmail },
  };

  return {
    headers,
    body,
    statusCode: 200,
  };
};

export default makePostUser;
