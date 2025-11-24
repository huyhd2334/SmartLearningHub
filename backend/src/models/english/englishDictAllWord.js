import mongoose from "mongoose";

const DictSchema = new mongoose.Schema({}, {
  collection: "dictionary_new",
  strict: false 
});

const Dict = mongoose.model("Dict", DictSchema);
export default Dict