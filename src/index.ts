import express from "express";
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
dotenv.config();
import connect from './db/index';
import Stays from "./stays";

const port = 3000;
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/stays", Stays);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
  connect();
});
