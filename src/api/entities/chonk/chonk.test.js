import uuidv5 from "uuid/v5";
import uuidv4 from "uuid/v4";
import faker from "faker";
import buildMakeChonk from "./index";

const generateChonk = () => ("ABCD1234");

describe("chonk", () => {
  const user = faker.random.uuid();
  const namespace = uuidv5("jwtuserauth.example.com", uuidv5.DNS);

  it("creates a chonk", () => {
    const makeChonk = buildMakeChonk({ generateChonk, namespace });
    const seed = uuidv4();
    const chonk = makeChonk({ user, seed });

    expect(chonk.getUser()).toBe(user);
    expect(chonk.getNamespace()).toBe(namespace);
    expect(chonk.getSeed()).toBe(seed);
    expect(chonk.getStatus()).toBe("success");
    expect(chonk.getChonk()).toBe(generateChonk());
    expect(chonk.getTimestamp()).toBeLessThanOrEqual(Date.now());
  });

  it("throws an error if namespace is missing", () => {
    const makeChonk = buildMakeChonk({ generateChonk, namespace: null });

    expect(() => makeChonk({ user, seed: uuidv4() }))
      .toThrowError(new Error("Chonk requires a valid namespace"));
  });

  it("throws an error if seed is missing", () => {
    const makeChonk = buildMakeChonk({ generateChonk, namespace });

    expect(() => makeChonk({ user, seed: null }))
      .toThrowError(new Error("Chonk requires a valid seed"));
  });

  it("throws an error if generator is not a function", () => {
    const makeChonk = buildMakeChonk({ generateChonk: "not a function", namespace });

    expect(() => makeChonk({ user, seed: uuidv4() }))
      .toThrowError(new Error("Chonk requires a valid generator"));
  });

  it("returns a status 'error' if chonk is not generated", () => {
    const makeChonk = buildMakeChonk({ generateChonk: () => (null), namespace });
    const chonk = makeChonk({ user, seed: uuidv4() });

    expect(chonk.getStatus()).toBe("error");
  });
});
