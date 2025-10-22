import express from "express";
import routerLogin from "./routers/routerLogin.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import routerChoseLangue from "./routers/routerChoseLevel.js";
import FetchVocabrouter from "./routers/routerFetchVocab.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
// create app
const app = express()
app.use(cors())

// midware
app.use(express.json())
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}
// user different route
app.use("/api",routerLogin)
app.use("/api",routerChoseLangue)
app.use("/api",FetchVocabrouter)


// if (process.env.NODE_ENV === "production") {
//    app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
//   });
// }

connectDB().then(() => {
  app.listen(8386, () => {
    console.log(`server bắt đầu trên cổng ${8386}`);
  });
});