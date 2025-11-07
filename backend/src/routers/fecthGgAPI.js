import express from "express"
import imageToText from "../controler/fetchTextFromImg";

const routerFecthGgAPI = express.Router();

routerFecthGgAPI.post("/imagetotext", imageToText)

export default routerFecthGgAPI