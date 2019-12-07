import faker from "faker";
import buildMakeChonk from "./index";

const generateChonk = () => ("ABCD1234");

describe("chonk", () => {
  const user = faker.random.uuid();
  const namespace = "sample-namespace";

  it("creates a chonk", () => {
    const makeChonk = buildMakeChonk({ user });
    const chonk = makeChonk({
      generateChonk,
      namespace,
    });

    expect(chonk.getUser()).toBe(user);
    expect(chonk.getNamespace()).toBe(namespace);
    expect(chonk.getStatus()).toBe("success");
    expect(chonk.getChonk()).toBe(generateChonk());
    expect(chonk.getTimestamp()).toBeLessThanOrEqual(Date.now());
  });

  it("returns a status 'error' if chonk is not generated", () => {
    const makeChonk = buildMakeChonk({ user });
    const chonk = makeChonk({
      generateChonk: () => (null),
      namespace,
    });

    expect(chonk.getStatus()).toBe("error");
  });

  it("throws an error if namespace is missing", () => {
    const makeChonk = buildMakeChonk({ user });

    expect(() => makeChonk({ generateChonk, namespace: null }))
      .toThrowError(new Error("Chonk requires a valid namespace"));
  });

  it("throws an error if generator is not a function", () => {
    const makeChonk = buildMakeChonk({ user });

    expect(() => makeChonk({ generateChonk: "string", namespace }))
      .toThrowError(new Error("Chonk requires a valid generator"));
  });
});
