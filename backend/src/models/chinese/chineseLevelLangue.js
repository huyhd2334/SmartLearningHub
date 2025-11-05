import mongoose from "mongoose";

const ChineselevelLangueSchema = new mongoose.Schema({
    accountName: {type: String, required: true},
    langue: {type: String, default: "chinese"},
    currentLevel: {type: Number, default: 1},
    startDay: {type: Date, default: Date.now}   
}
)
const ChineseLevelLangue = mongoose.model("ChineseLevelLangue", ChineselevelLangueSchema)
export default ChineseLevelLangue

