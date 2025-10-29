import express from "express"
import FetchQuestionToeic from "../controler/fetchQuestionToeic.js"
const QuestionRouter = express.Router()

QuestionRouter.post("/questionpartfive",FetchQuestionToeic)

export default QuestionRouter