import faker from "faker";
import uuidv4 from "uuid/v4";
import makePostUser from "./post-user";
import { addUser } from "../behaviors";

// eslint-disable-next-line import/named
import { apiKey } from "../../config";

describe("post-user", () => {
  let postUser;

  beforeEach(() => {
    postUser = makePostUser({ addUser, adminApiKey: apiKey });
  });

  it("adds a new user", async () => {
    const httpRequest = {
      ip: faker.internet.ip(),
      headers: {
        "x-api-key": apiKey,
        "User-Agent": faker.internet.userAgent(),
        Referrer: faker.internet.url(),
      },
      body: {
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    };

    const { headers, statusCode, body } = await postUser(httpRequest);
    const { id, email } = body.user;

    expect(headers).toMatchObject({ "Content-Type": "application/json" });
    expect(statusCode).toBe(200);
    expect(id).not.toBeNull();
    expect(email).toBe(httpRequest.body.email);
  });
  it("returns 403 is api key is missing", async () => {

  });
  it("returns 401 is api key is incorrect", async () => {

  });
});