const buildMakeUser = ({ Id, Email, makeHash, makeSource }) => ({
  id = Id.makeId(),
  email,
  password,
  source,
  createdAt = Date.now(),
  updatedAt = Date.now(),
}) => {
  if (!email || !Email.validate(email)) {
    throw new Error("User requires a valid email");
  }

  if (!password) {
    throw new Error("User requires a valid password");
  }

  const userSource = makeSource(source);
  const hashText = `${id}${email}${createdAt}${updatedAt}`;
  let hash;

  return {
    getId: () => id,
    getEmail: () => email,
    getPassword: () => password,
    getSource: () => userSource,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,
    getHash: () => (hash || makeHash(hashText)),
  };
};

export default buildMakeUser;
