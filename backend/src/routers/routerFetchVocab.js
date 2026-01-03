import express from "express"
import {getAllVocabs, getAllVocabsTopic} from "../controler/LogicFetchVocab.js"
import { AddUserVocab, FetchUserVocab, getCurrentData } from "../controler/LogicUserVocab.js"

const FetchVocabrouter = express.Router()

FetchVocabrouter.post("/getallvocab", getAllVocabs)
FetchVocabrouter.post("/adduservocab",AddUserVocab)
FetchVocabrouter.post("/getuservocab",FetchUserVocab)
FetchVocabrouter.post("/getvocabstopic", getAllVocabsTopic)
FetchVocabrouter.post("/getcurrentdata", getCurrentData)

export default FetchVocabrouter

