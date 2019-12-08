import path from "path";
import dotenv from "dotenv";
import merge from "lodash/merge";
import { existsSync } from "fs";


if (process.env.NODE_ENV !== "production") {
  const envConfigFile = path.join(__dirname, `./.env.${process.env.NODE_ENV}`);
  if (!existsSync(envConfigFile)) {
    throw new Error(`Expected config file not found: ${envConfigFile}`);
  }
  dotenv.config({ path: envConfigFile });
}

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    root: path.join(__dirname, "../.."),
    port: process.env.PORT || 3000,
    ip: process.env.IP || "0.0.0.0",
    apiRoot: process.env.API_ROOT || "/api",
    domain: "jwtuserauth.rnickerson.com",
  },
  test: {
    mongo: {
      uri: "mongodb://localhost",
      dbName: "jwt-user-auth-test",
      options: {
        debug: true,
        useNewUrlParser: true,
      },
    },
  },
  development: {
    mongo: {
      uri: "mongodb://localhost",
      dbName: "jwt-user-auth-dev",
      options: {
        debug: true,
        useNewUrlParser: true,
      },
    },
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
  },
};

module.exports = merge(config.all, config[config.all.env]);
export default module.exports;
