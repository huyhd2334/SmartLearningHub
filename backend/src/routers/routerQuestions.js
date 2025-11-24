import express from "express"
import FetchQuestionToeic from "../controler/LogicQuestionToeic.js"
const QuestionRouter = express.Router()

QuestionRouter.post("/questionpartfive",FetchQuestionToeic)

export default QuestionRouter