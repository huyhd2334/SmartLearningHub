import express from "express"
import {fetchVocabTo} from "../controler/fetchVocabTo.js"
import { AddUserVocab, FetchUserVocab } from "../controler/fetchUserVocab.js"

const FetchVocabrouter = express.Router()

FetchVocabrouter.post("/get100vocab", fetchVocabTo)
FetchVocabrouter.post("/adduservocab",AddUserVocab)
FetchVocabrouter.post("/getuservocab",FetchUserVocab)

export default FetchVocabrouter

