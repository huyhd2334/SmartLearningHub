import mongoose from "mongoose";

const UserVocabSchema = new mongoose.Schema({
    accountName: {type: String},
    pron: {type: String},
    vocab: {type: String},
    type: {type:String},
    meaning: {type: String},
    example: {type: String},
    level: {type: Number, min: 0, max: 6, default: 0},
}
)

const UserVocabs = mongoose.model("UserVocabs", UserVocabSchema)
export default UserVocabs