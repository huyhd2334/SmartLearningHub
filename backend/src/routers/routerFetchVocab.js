import express from "express"
import {get100Vocabs} from "../controler/LogicFetchVocab.js"
import { AddUserVocab, FetchUserVocab } from "../controler/LogicUserVocab.js"

const FetchVocabrouter = express.Router()

FetchVocabrouter.post("/get100vocab", get100Vocabs)
FetchVocabrouter.post("/adduservocab",AddUserVocab)
FetchVocabrouter.post("/getuservocab",FetchUserVocab)

export default FetchVocabrouter

