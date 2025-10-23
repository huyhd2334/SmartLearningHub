import express from "express"
import { newReading } from "../controler/crawNews.js"

const routerCrawReading = express.Router()
routerCrawReading.post("/addreading",newReading )
export default routerCrawReading