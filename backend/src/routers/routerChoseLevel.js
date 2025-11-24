import { choseLangue } from "../controler/LogicChoseLevel.js";
import express from "express"

const routerChoseLangue = express.Router();

routerChoseLangue.post("/choseLangue", choseLangue)

export default routerChoseLangue