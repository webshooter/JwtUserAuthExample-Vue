import { makeGetChonk } from "./get-chonk";
import createChonk from "../behaviors";

const getChonk = makeGetChonk({ createChonk });

const controllers = { getChonk };

export default controllers;
export { getChonk };
