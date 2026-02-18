import mongoose from "mongoose";

const englishUserVocabsSchema = new mongoose.Schema({
    accountName: {type: String},
    pron: {type: String},
    vocab: {type: String},
    type: {type:String},
    meaning: {type: String},
    example: {type: String},
    level: {type: Number, min: 0, max: 6, default: 0},
    last: {type: Date},
    last_review_result: {type: Boolean},
    correct: {type: Number, default: 0},
    incorrect: {type: Number, default: 0},
    risk: {type: Number, default: 10}
}
)

const UserVocabs = mongoose.model("englishUserVocabs", englishUserVocabsSchema)
export default UserVocabs