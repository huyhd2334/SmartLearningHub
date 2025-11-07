import express from "express"
import imageToText from "../controler/fetchTextFromImg.js";

const routerFecthGgAPI = express.Router();

routerFecthGgAPI.post("/imagetotext", imageToText)

export default routerFecthGgAPI