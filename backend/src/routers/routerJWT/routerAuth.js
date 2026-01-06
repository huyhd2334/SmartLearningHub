import express from "express"

import { createAccount, loginAccount, logoutAccount, refreshToken } from "../../controler/LogicAuth.js"

const router = express.Router();

router.post("/signup", createAccount)
router.post("/login", loginAccount)
router.post("/logout", logoutAccount)
router.post("/refresh-accesstoken", refreshToken)

export default router