import express from "express";
import morgan from "morgan";
import logger from "./logger";

// eslint-disable-next-line import/named
import { port } from "./config";

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => logger.info(`JWTUserAuth app listening on port ${port}!`));
