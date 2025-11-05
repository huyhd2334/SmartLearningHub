import Reading from "../models/english/news.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import lemmatizer from 'wink-lemmatizer';
import Dict from "../models/english/dictAllWord.js";
import ChineseDict from "../models/chinese/chineseDictAllWord.js"
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
        const {get, langue} = req.body
        if (get === "get" && langue === "english" ){
            const data = await Reading.find().sort({createDate: -1 }).limit(1)
            if(data){
                res.status(200).json({message: "oke", reading: data})
            }else{
                res.status(404).json({message: "error"})
            }
        }else{
            // chinese
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
                const binary = [1]*length(words)
                // for(const word of words) {
                //     const result = await db.get("SELECT * FROM dictionary WHERE vocab = ?", [word.toLowerCase()])
                //     if(result){
                //        binary.push(1)
                //     }else{binary.push(0)}
                // }
                res.status(200).json({message: "oke", data: binary})
            }else{
                res.status(404).json({message: "error"})}}
    }catch(error){
        console.error(error)
    }
}

export const FindDetail = async (req, res) => {
    try {
        const { word, langue } = req.body;
        if(langue === "english"){
            if (!word) return res.status(404).json({ message: "error" });
            const lowerWord = word.toLowerCase();
            let result = await Dict.findOne({ vocab: lowerWord });
            if (result) return res.status(200).json({ message: "oke", detail: result });
            const verb = lemmatizer.verb(lowerWord);
            if (verb) {
                result = await Dict.findOne({ vocab: verb });
                if (result) return res.status(200).json({ message: "oke", detail: result });
            }
            const noun = lemmatizer.noun(lowerWord);
            if (noun) {
                result = await Dict.findOne({ vocab: noun });
                if (result) return res.status(200).json({ message: "oke", detail: result });
            }
            const adj = lemmatizer.adjective(lowerWord);
            if (adj) {
                result = await Dict.findOne({ vocab: adj });
                if (result) return res.status(200).json({ message: "oke", detail: result });
            }
            return res.status(200).json({ message: "Not found" });  
        }else{
            if (!word) return res.status(404).json({ message: "error" });
            let result = await ChineseDict.findOne({ vocab: word });
            if (result){return res.status(200).json({ message: "oke", detail: result })}};
    }catch(error) {
        console.error(error);
        return res.status(500).json({ message: "internal error" });
    }
};
