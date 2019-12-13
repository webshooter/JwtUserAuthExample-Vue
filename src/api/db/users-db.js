import Id from "../../Id";

const collectionName = "users";

const makeUsersDb = ({ makeDb }) => {
  const findAll = async () => {
    const db = await makeDb();
    const query = {};
    const result = await db
      .collection(collectionName)
      .find(query);

    return (await result.toArray())
      .map(({ _id: id, ...rest }) => ({ id, ...rest }));
  };

  const findById = async ({ id: _id }) => {
    const db = await makeDb();
    const query = { _id };
    const result = await db
      .collection(collectionName)
      .findOne(query);

    if (!result) {
      return result;
    }

    const { _id: id, ...found } = result;
    return { id, ...found };
  };

  const findByEmail = async ({ email }) => {
    const db = await makeDb();
    const query = { email };
    const result = await db
      .collection(collectionName)
      .findOne(query);

    if (!result) {
      return result;
    }

    const { _id: id, ...found } = result;
    return { id, ...found };
  };

  const findByHash = async ({ hash }) => {
    const db = await makeDb();
    const query = { hash };
    const result = await db
      .collection(collectionName)
      .findOne(query);

    if (!result) {
      return result;
    }

    const { _id: id, ...found } = result;
    return { id, ...found };
  };

  const insert = async userInfo => {
    // eslint-disable-next-line no-underscore-dangle
    const _id = userInfo.id || Id.makeId();
    const db = await makeDb();
    const query = { _id, ...userInfo };
    const result = await db
      .collection(collectionName)
      .insertOne(query);
    const { _id: id, ...insertedInfo } = result.ops[0];

    return { id, ...insertedInfo };
  };

  const update = async ({ id: _id, ...userInfo }) => {
    const db = await makeDb();
    const find = { _id };
    const query = { $set: { ...userInfo } };
    const result = await db
      .collection(collectionName)
      .updateOne(find, query);

    return result.modifiedCount > 0
      ? { id: _id, ...userInfo }
      : null;
  };

  const remove = async ({ id: _id }) => {
    const db = await makeDb();
    const query = { _id };
    const result = await db
      .collection(collectionName)
      .deleteOne(query);

    return result.deletedCount;
  };

  return Object.freeze({
    findAll,
    findById,
    findByEmail,
    findByHash,
    insert,
    update,
    remove,
  });
};

export default makeUsersDb;
export { collectionName };
