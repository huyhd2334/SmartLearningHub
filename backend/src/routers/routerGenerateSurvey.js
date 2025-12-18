import express from "express"
import { getVocabForSurvey } from "../controler/LogicGenerateSurvey"

const routerSurvey = express.Router()

routerSurvey.post("/getvocabforsurvey", getVocabForSurvey)

export default routerSurvey
