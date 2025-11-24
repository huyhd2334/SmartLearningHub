import express from "express"

import { createAccount, loginAccount } from "../../controler/LogicAuth.js"

const router = express.Router();

router.post("/signup", createAccount)

router.post("/login", loginAccount)

export default router