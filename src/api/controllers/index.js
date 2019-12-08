import { makeGetChonk } from "./get-chonk";
import createChonk from "../behaviors";

const getChonk = makeGetChonk({ createChonk });

const controller = Object.freeze({ getChonk });

export default controller;
export { getChonk };
