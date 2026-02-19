import express from "express"
import { updateRisk } from "../controler/LogicUserVocab.js"

const UpdateRouter = express.Router()

UpdateRouter.post("/update", updateRisk)

export default UpdateRouter