import express from "express"
import {refreshToken} from "../../controler/LogicUser.js"
const routerUser = express.Router()

routerUser.post("/refresh-token", refreshToken)

export default routerUser