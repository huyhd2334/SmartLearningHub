import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import routerChoseLangue from "./routers/routerChoseLevel.js";
import FetchVocabrouter from "./routers/routerFetchVocab.js";
import routerCrawNews from "./routers/routerCrawNews.js";
import QuestionRouter from "./routers/routerQuestions.js"
import routerFecthGgAPI from "./routers/routerGgAPI.js"
import routerHist from "./routers/routerHist.js"
import routerAuth from "./routers/routerJWT/routerAuth.js"
import routerUser from "./routers/routerJWT/routerUser.js"
import routerSurvey from "./routers/routerGenerateSurvey.js"
import {protectedRouter} from "./middlewares/authMiddleware.js"
import cookieParser from "cookie-parser"

dotenv.config();
const __dirname = path.resolve();

// create app
const app = express()

// middleware
app.use(express.json());

// cors
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// cookie
app.use(cookieParser())

// public routers
app.use("/api/auth", routerAuth)
app.use("/api", routerSurvey)
// private routers

app.use("/api", protectedRouter, routerUser)
app.use("/api", protectedRouter, routerChoseLangue)
app.use("/api", protectedRouter, FetchVocabrouter)
app.use("/api", protectedRouter, routerCrawNews)
app.use("/api", protectedRouter, QuestionRouter)
app.use("/api", protectedRouter, routerFecthGgAPI)
app.use("/api", protectedRouter, routerHist)

if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server bắt đầu trên cổng ${process.env.PORT}`);
  });
});