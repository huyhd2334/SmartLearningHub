import mongoose from "mongoose";

const ChineseDictSchema = new mongoose.Schema({}, {
  collection: "chinese_dict",
  strict: false 
});

const ChineseDict = mongoose.model("ChineseDict", ChineseDictSchema);
export default ChineseDict