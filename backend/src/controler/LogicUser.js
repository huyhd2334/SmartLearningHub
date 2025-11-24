import jwt from "jsonwebtoken";
import Session from "../models/session.js";
import Account from "../models/account.js";

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    const session = await Session.findOne({ refreshToken: token });
    if (!session) return res.status(403).json({ message: "Invalid refresh token" });

    const user = await Account.findById(session.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const accessToken = jwt.sign(
      { user_id: user._id },
      process.env.ACCESS_TOKEN_SCRETE,
      { expiresIn: "30m" }
    );

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
