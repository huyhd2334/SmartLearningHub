import { choseLangue } from "../controler/choseLevelLogic.js";
import express from "express"

const routerChoseLangue = express.Router();

routerChoseLangue.post("/choseLangue", choseLangue)

export default routerChoseLangue