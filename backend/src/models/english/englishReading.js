import mongoose from "mongoose";

const ReadingSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String, required: true },
  content: { type: String },
  urlToImage: { type: String },
  createDate: { type: Date },
});

const Reading = mongoose.model("Reading", ReadingSchema);
export default Reading;
