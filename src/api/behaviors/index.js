import buildCreateChonk from "./create-chonk";
import buildAddUser from "./add-user";
import { usersDb } from "../db";


const createChonk = buildCreateChonk();
const addUser = buildAddUser({
  findUserById: usersDb.findById,
  findUserByEmail: usersDb.findByEmail,
  insertUser: usersDb.insert,
});

const behaviors = Object.freeze({
  createChonk,
  addUser,
});

export default behaviors;
export {
  createChonk,
  addUser,
};
