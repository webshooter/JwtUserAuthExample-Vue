import uuidv4 from "uuid/v4";
import makeUserAuth from "./user-auth";

const dataSource = { userId: uuidv4() };

const userAuth = makeUserAuth({ dataSource });

export default userAuth;
