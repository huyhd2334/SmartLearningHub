import mongoose from "mongoose";

const ChineseReadingSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String, required: true },
  content: { type: String },
  urlToImage: { type: String },
  createDate: { type: Date },
});

const ChineseReading = mongoose.model("ChineseReading", ChineseReadingSchema);
export default ChineseReading;
