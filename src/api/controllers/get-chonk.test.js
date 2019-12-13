import uuidv4 from "uuid/v4";
import makeGetChonk from "./get-chonk";
import { createChonk } from "../behaviors";

describe("get-chonk", () => {
  it("returns a new chonk", async () => {
    const httpRequest = {
      user: uuidv4(),
      body: {
        seed: uuidv4(),
      },
    };
    const getChonk = makeGetChonk({ createChonk });
    const { headers, statusCode, body } = await getChonk(httpRequest);
    const { user, seed, timestamp } = body.chonk;

    expect(headers).toMatchObject({ "Content-Type": "application/json" });
    expect(statusCode).toBe(200);
    expect(user).toBe(httpRequest.user);
    expect(seed).toBe(httpRequest.body.seed);
    expect(timestamp).toBeLessThanOrEqual(Date.now());
  });
});
