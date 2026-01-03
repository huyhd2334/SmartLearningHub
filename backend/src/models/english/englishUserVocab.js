import mongoose from "mongoose";

const englishUserVocabsSchema = new mongoose.Schema({
    accountName: {type: String},
    pron: {type: String},
    vocab: {type: String},
    type: {type:String},
    meaning: {type: String},
    example: {type: String},
    level: {type: Number, min: 0, max: 6, default: 0},
    last: {type: Date}
}
)

const UserVocabs = mongoose.model("englishUserVocabs", englishUserVocabsSchema)
export default UserVocabs