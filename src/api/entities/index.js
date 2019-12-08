import uuidv5 from "uuid/v5";
import buildMakeChonk from "./chonk";
import buildGenerateChonkValue from "../generate-chonk-value";

// eslint-disable-next-line import/named
import { domain } from "../../config";

const namespace = uuidv5(domain, uuidv5.DNS);

const generateChonkValue = buildGenerateChonkValue({ namespace });

const makeChonk = buildMakeChonk({ generateChonkValue, namespace });

const entities = Object.freeze({
  makeChonk,
});

export default entities;
export { makeChonk };
