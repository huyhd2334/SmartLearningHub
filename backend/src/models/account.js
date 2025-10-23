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
  passW: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  streak: {
    type: Number,
    default: 0,
  }

})

const Account = mongoose.model("Account", accountSchema)
export default Account

