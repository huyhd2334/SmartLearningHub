import Reading from "../models/news.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

sqlite3.verbose();

export const newReading = async(req, res) => {
    try{
        const {author, title, content,urlToImage} = req.body
        const newRead = await Reading.create({author, title, content, urlToImage, createDate: Date.now()})
        res.status(201).json({
        data: newRead,})
    }catch(error){
        console.error(error)
    }
}

export const sendReading = async(req, res) => {
    try{
        const {get} = req.body
        if (get === "get"){
            const data = await Reading.find().sort({ date: -1 }).limit(10)
            if(data){
                res.status(200).json({message: "oke", reading: data})
            }else{
                res.status(404).json({message: "error"})
            }
        }
    }catch(error){
        console.error(error)
    }
}

export const splitReading = async(req, res) => {
    try{
        const db = await open({
                                filename: "dictionary.db",
                                driver: sqlite3.Database,
                                });
        const {id} = req.body
        if (id){
            const data = await Reading.findById(id)
            if(data){
                const words = data.content.split(/\s+/)               
                const binary = []
                for(const word of words) {
                    const result = await db.get("SELECT * FROM dictionary WHERE vocab = ?", [word.toLowerCase()])
                    if(result){
                       binary.push(1)
                    }else{binary.push(0)}
                }
                res.status(200).json({message: "oke", data: binary})
            }else{
                res.status(404).json({message: "error"})
            }
        }
    }catch(error){
        console.error(error)
    }
}