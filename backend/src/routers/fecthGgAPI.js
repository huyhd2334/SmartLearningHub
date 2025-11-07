import express from "express"
import { imageToTextHandler } from "../controler/fetchTextFromImg.js";

const routerFecthGgAPI = express.Router();

routerFecthGgAPI.post("/imagetotext", imageToTextHandler)

export default routerFecthGgAPI