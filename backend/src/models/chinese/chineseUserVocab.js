import mongoose from "mongoose";

const ChineseUserVocabSchema = new mongoose.Schema({
    accountName: {type: String},
    vocab: {type: String},
    meaning: {type: String},
    english: {type: [String]},
    level: {type: Number, min: 0, max: 6, default: 0},
    last: {type: Date},
    last_review_result: {type: Boolean},
    correct: {type: Number, default: 0},
    incorrect: {type: Number, default: 0},
    risk: {type: Number, default: 10}
}
)

const ChineseUserVocabs = mongoose.model("ChineseUserVocabs", ChineseUserVocabSchema)
export default ChineseUserVocabs