import express from "express"
import {getAllVocabs, getAllVocabsTopic} from "../controler/LogicFetchVocab.js"
import { AddUserVocab, FetchUserVocab } from "../controler/LogicUserVocab.js"

const FetchVocabrouter = express.Router()

FetchVocabrouter.post("/getallvocab", getAllVocabs)
FetchVocabrouter.post("/adduservocab",AddUserVocab)
FetchVocabrouter.post("/getuservocab",FetchUserVocab)
FetchVocabrouter.post("/getvocabstopic", getAllVocabsTopic)
export default FetchVocabrouter

