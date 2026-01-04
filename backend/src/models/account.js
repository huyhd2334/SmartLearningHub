import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
{
  userName: {
    type: String,
    required: true
  },
  accountName: {
    type: String,
    required: true
  },
  hashPassW: {
    type: String,
    required: true
  },
  createDate:{
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  streakEnglish: {
    type: Number,
    default: 0,
  },
  streakChinese: {
    type: Number,
    default: 0,
  }
})

const Account = mongoose.model("Account", accountSchema)
export default Account

