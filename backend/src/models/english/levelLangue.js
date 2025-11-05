import mongoose from "mongoose";

const levelLangueSchema = new mongoose.Schema({
    accountName: {type: String, required: true},
    langue: {type: String, default: "english"},
    currentLevel: {type: Number, default: 1},
    startDay: {type: Date, default: Date.now}   
}
)

const levelLangue = mongoose.model("levelLangue", levelLangueSchema)
export default levelLangue