import { makeUser } from "../entities";

const buildAddUser = ({
  findUserById,
  findUserByEmail,
  insertUser,
}) => async userInfo => {
  const user = await makeUser(userInfo);
  const userWithMatchingId = await findUserById({ id: user.getId() });
  if (userWithMatchingId) {
    return userWithMatchingId;
  }

  const userWithMatchingEmail = await findUserByEmail({ email: user.getEmail() });
  if (userWithMatchingEmail) {
    return userWithMatchingEmail;
  }

  const userSource = user.getSource();
  const addedUser = await insertUser({
    id: user.getId(),
    email: user.getEmail(),
    password: user.getPassword(),
    hash: user.getHash(),
    createdAt: user.getCreatedAt(),
    updatedAt: user.getUpdatedAt(),
    source: {
      ip: userSource.getIp(),
      browser: userSource.getBrowser(),
      referrer: userSource.getReferrer(),
    },
  });

  return addedUser;
};

export default buildAddUser;
