import Questionpartfive from "../models/english/questionpartfive.js";

const FetchQuestionToeic = async(req,res) => {
    try{
    const {questionpartfive} = req.body
    if(questionpartfive === "get"){
        const questions = await Questionpartfive.aggregate([{"$sample": {"size": 30}}])
        if(questions){
            res.status(200).json({"message": "oke", questions: questions})
        }else{res.status(200).json({"message": "no question"})}}

    }catch(error){
        console.error(error)}
}

export default FetchQuestionToeic