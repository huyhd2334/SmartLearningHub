import express from "express"
import { countAllVocabs, countFlashCard } from "../controler/LogicHist.js";

const routerHist = express.Router();
routerHist.post("/hist/countflashcard", countFlashCard)
routerHist.post("/hist/countallvocab", countAllVocabs)

export default routerHist