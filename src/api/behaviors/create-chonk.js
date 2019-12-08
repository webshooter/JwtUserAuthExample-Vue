import { makeChonk } from "../entities";

const buildCreateChonk = ({ user, seed }) => () => makeChonk({ user, seed });

export default buildCreateChonk;
