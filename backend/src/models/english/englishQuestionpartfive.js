import mongoose from "mongoose";

const QuestionpartfiveSchema = new mongoose.Schema({}, {
  collection: "questionspartfive",
  strict: false 
});

const Questionpartfive = mongoose.model("Questionpartfive", QuestionpartfiveSchema);
export default Questionpartfive