import express from "express";
import morgan from "morgan";
import logger from "./logger";
import makeCallback from "./express-callback";
import { getChonk } from "./api/controllers";

// eslint-disable-next-line import/named
import { port, apiRoot } from "./config";

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => res.send("JWTUserAuth Example App!"));

app.get(`${apiRoot}`, (req, res) => res.send("JWTUserAuth Example App API!"));
app.get(`${apiRoot}/chonk`, makeCallback(getChonk));

app.listen(port, () => logger.info(`JWTUserAuth app listening on port ${port}!`));
