import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import logger from "./logger";
import makeCallback from "./express-callback";
import { getChonk } from "./api/controllers";

// eslint-disable-next-line import/named
import { port, apiRoot } from "./config";


const app = express();

// parse application/json
app.use(bodyParser.json());

// use morgan for request logging
app.use(morgan("dev"));

// routing
app.get("/", (req, res) => res.send("JWTUserAuth Example App!"));

app.get(`${apiRoot}`, (req, res) => res.send("JWTUserAuth Example App API!"));
app.post(`${apiRoot}`, (req, res) => res.send("JWTUserAuth Example App API!"));
app.post(`${apiRoot}/chonk`, makeCallback(getChonk));

app.listen(port, () => logger.info(`JWTUserAuth app listening on port ${port}!`));
