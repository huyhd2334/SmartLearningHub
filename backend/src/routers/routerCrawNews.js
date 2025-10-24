import express from "express"
import { newReading, sendReading, splitReading } from "../controler/controlReading.js"

const routerCrawReading = express.Router()

routerCrawReading.post("/addreading",newReading )
routerCrawReading.post("/getreading",sendReading )
routerCrawReading.post("/splitreading",splitReading )

export default routerCrawReading