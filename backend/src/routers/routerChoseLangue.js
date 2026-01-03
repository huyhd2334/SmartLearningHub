import { choseLangue } from "../controler/LogicChoseLangue.js";
import express from "express"

const routerChoseLangue = express.Router();

routerChoseLangue.post("/choseLangue", choseLangue)

export default routerChoseLangue