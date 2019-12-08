import uuidv4 from "uuid/v4";
import uuidv5 from "uuid/v5";
import buildGenerateChonkValue from "../generate-chonk-value";
import buildCreateChonk from "./create-chonk";

// eslint-disable-next-line import/named
import { domain } from "../../config";

describe("create new chonk", () => {
  let namespace;
  let generateChonkValue;

  beforeEach(() => {
    namespace = uuidv5(domain, uuidv5.DNS);
    generateChonkValue = buildGenerateChonkValue({ namespace });
  });

  it("creates a new chonk", () => {
    const user = uuidv4();
    const seed = uuidv4();
    const createChonk = buildCreateChonk({ user, seed });
    const chonk = createChonk();

    expect(chonk.getUser()).toBe(user);
    expect(chonk.getNamespace()).toBe(namespace);
    expect(chonk.getSeed()).toBe(seed);
    expect(chonk.getStatus()).toBe("success");
    expect(chonk.getChonk()).toBe(generateChonkValue({ user, seed }));
    expect(chonk.getTimestamp()).toBeLessThanOrEqual(Date.now());
  });
});
