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
  origin: "https://smartlearninghub-2.onrender.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// cookie
app.use(cookieParser())

// public routers
app.use("/api/auth", routerAuth)


// private routers
app.use(protectedRouter)

app.use("/api", routerUser)
app.use("/api",routerChoseLangue)
app.use("/api",FetchVocabrouter)
app.use("/api", routerCrawNews)
app.use("/api", QuestionRouter)
app.use("/api", routerFecthGgAPI)
app.use("/api", routerHist)

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