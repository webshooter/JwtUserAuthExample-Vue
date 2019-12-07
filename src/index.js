import express from "express";

// eslint-disable-next-line import/named
import { port } from "./config";

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`JWTUserAuth app listening on port ${port}!`));
