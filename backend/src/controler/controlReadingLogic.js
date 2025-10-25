import Reading from "../models/news.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import lemmatizer from 'wink-lemmatizer';

// console.log(lemmatizer.verb('running'));  // run
// console.log(lemmatizer.noun('cars'));     // car
// console.log(lemmatizer.adjective('better')); // good

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
            const data = await Reading.find().sort({createDate: -1 }).limit(1)
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
        const db = await open({ filename: "dictionary.db",
                                driver: sqlite3.Database,
                                });
        const {id} = req.body
        if (id){
            const data = await Reading.findById(id)
            if(data){
                const words = data.content.toLowerCase().replace(/[^a-zA-Z']/g, '')              
                const binary = []
                for(const word of words) {
                    const result = await db.get("SELECT * FROM dictionary WHERE vocab = ?", [word.toLowerCase()])
                    if(result){
                       binary.push(1)
                    }else{binary.push(0)}
                }
                res.status(200).json({message: "oke", data: binary})
            }else{
                res.status(404).json({message: "error"})}}
    }catch(error){
        console.error(error)
    }
}

export const FindDetail = async(req, res) => {
    try{
        const db = await open({
                                filename: "dictionary.db",
                                driver: sqlite3.Database,
                                });
        const {word} = req.body
        if (word){
            const result = await db.get("SELECT * FROM dictionary WHERE vocab = ?", [word.toLowerCase()])
            if (result){ res.status(200).json({message: "oke" , detail: result})}
            else{const resultV = await db.get("SELECT * FROM dictionary WHERE vocab = ?", [lemmatizer.verb(word.toLowerCase())])
                if(resultV){res.status(200).json({message: "oke" , detail: resultV})}
                else{const resultN = await db.get("SELECT * FROM dictionary WHERE vocab = ?", [lemmatizer.noun(word.toLowerCase())])
                    if(resultN){res.status(200).json({message: "oke" , detail: resultN})}
                    else{res.status(200).json({message: "notfound"})}
                }}
        }else{res.status(404).json({message: "error"})}
    }catch(error){console.error(error)}
}