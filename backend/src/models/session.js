import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },

    refreshToken: {
      type: String,   // sửa: String viết hoa
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// auto delete when token expires
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // sửa: expiresAt đúng tên

export default mongoose.model('Session', sessionSchema);
