import mongodb from "mongodb";
import makeUsersDb from "./users-db";

// eslint-disable-next-line import/named
import { mongo } from "../../config";

const { uri, dbName, options } = mongo;

const { MongoClient } = mongodb;
const client = new MongoClient(uri, options);

const makeDb = async () => {
  if (!client.isConnected()) {
    await client.connect();
  }
  return client.db(dbName);
};

const usersDb = makeUsersDb({ makeDb });

export {
  makeDb,
  usersDb,
};
