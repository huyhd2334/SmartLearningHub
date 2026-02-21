import express from "express"
import { updateRisk } from "../controler/LogicUserVocab.js"
import {vocabReview} from "../controler/LogicReviewVocab.js"

const UpdateRouter = express.Router()

UpdateRouter.post("/update", updateRisk)
UpdateRouter.post("/review", vocabReview)

export default UpdateRouter