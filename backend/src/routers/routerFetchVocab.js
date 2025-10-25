import express from "express"
import {fetchVocabTo} from "../controler/fetchVocabLogic.js"
import { AddUserVocab, FetchUserVocab } from "../controler/fetchUserVocabLogic.js"

const FetchVocabrouter = express.Router()

FetchVocabrouter.post("/get100vocab", fetchVocabTo)
FetchVocabrouter.post("/adduservocab",AddUserVocab)
FetchVocabrouter.post("/getuservocab",FetchUserVocab)

export default FetchVocabrouter

