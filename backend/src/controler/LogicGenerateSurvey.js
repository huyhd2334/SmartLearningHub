import express from "express"
import { spawn } from "child_process"
import path from "path"
export const getVocabForSurvey = async(req, res) => {
    try {
        const {number, offset} = req.body
        const pyPath = path.resolve(process.cwd(),"..", "ML", "data","create_data_survey", "generate_survey.py")
        
        const pythonCmd = process.platform === "win32" ? "python" : "python3";
        const py = spawn(pythonCmd, [pyPath, String(number), String(offset)]);
        
        let result = ""

        py.stdout.on("data", (chunk) => {
        result += chunk.toString()
        });

        py.on("close", () => {
        const parsed = JSON.parse(result)
        res.status(200).send(parsed)
        console.log(parsed)
        });

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" })
    }   

}