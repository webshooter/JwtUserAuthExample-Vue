import uuidv5 from "uuid/v5";
import uuidv4 from "uuid/v4";
import buildGenerateChonkValue from "./index";

describe("buildGenerateChonkValue", () => {
  it("returns a function", () => {
    const generateChonk = buildGenerateChonkValue({ namespace: "ABCD1234" });
    expect(typeof generateChonk === "function").toBe(true);
  });
  it("throws an error is namespace is missing", () => {
    expect(buildGenerateChonkValue({ namespace: null }))
      .toThrowError(new Error("generateChonk requires a valid namespace"));
  });
});

describe("generateChonkValue", () => {
  let generateChonkValue;
  const namespace = uuidv5("jwtuserauth.example.com", uuidv5.DNS);

  beforeEach(() => {
    generateChonkValue = buildGenerateChonkValue({ namespace });
  });

  it("creates the chonk value for user and seed", () => {
    const user = uuidv4();
    const seed = "random seed data";
    const chonkValue = generateChonkValue({ user, seed });

    expect(chonkValue).toBe(uuidv5(`${user}-${seed}`, namespace));
  });
  it("throws an error if user is missing", () => {
    expect(() => generateChonkValue({ user: null, seed: "random seed data" }))
      .toThrowError(new Error("generateChonkValue requires a valid user"));
  });
  it("throws an error if seed is missing", () => {
    expect(() => generateChonkValue({ user: uuidv4(), seed: null }))
      .toThrowError(new Error("generateChonkValue requires a valid seed"));
  });
});
