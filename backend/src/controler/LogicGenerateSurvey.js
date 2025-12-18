import express from "express"
import { spawn } from "child_process"

export const getVocabForSurvey = async(req, res) => {
    try {
        const {number, offset} = req.body
        const pyPath = path.resolve(process.cwd(), "ML", "generate_survey.py")
        const py = spawn("python",[pyPath, String(number), String(offset)])
        
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