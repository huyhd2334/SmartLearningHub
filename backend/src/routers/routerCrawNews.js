import express from "express"
import { FindDetail, newReading, sendReading, splitReading } from "../controler/controlReading.js"

const routerCrawReading = express.Router()

routerCrawReading.post("/addreading",newReading )
routerCrawReading.post("/getreading",sendReading )
routerCrawReading.post("/splitreading",splitReading )
routerCrawReading.post("/finddetail",FindDetail)

export default routerCrawReading