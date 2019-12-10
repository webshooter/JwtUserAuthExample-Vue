import faker from "faker";
import makeUserAuth from "./user-auth";

describe("user-auth", () => {
  let userAuth;
  let userId;

  beforeEach(() => {
    userId = faker.random.uuid();
    userAuth = makeUserAuth({ dataSource: { userId } });
  });

  it("adds a user id to the request", () => {
    const req = {
      ip: "169.1.1.1",
      prop1: "this is prop1",
      prop2: 2,
    };

    const res = {};
    const next = jest.fn();

    userAuth(req, res, next);
    const { user } = req;
    expect(user).toBe(userId);
    expect(next).toHaveBeenCalledTimes(1);
  });
});
