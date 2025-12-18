import sqlite3 from "sqlite3";
import ChineseDict from "../models/chinese/chineseDictAllWord.js"
import Dict from "../models/english/englishDictAllWord.js"

export const getAllVocabs = async(req,res) => {
    try {
    const { offset, langue } = req.body;
    if(langue === "english"){
        const offsetInt = parseInt(offset) || 0;
        const limit = 50
        const rows = await Dict.find().skip(offsetInt).limit(limit)
        res.status(200).json(rows);
    }else{
      // chinese
        const offsetInt = parseInt(offset) || 0;
        const limit = 100
        const rows = await ChineseDict.find().skip(offsetInt).limit(limit)
        res.status(200).json(rows);
    }
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Database error" });}  
}

export const getAllVocabsTopic =  async(req, res) => {
       const langue = req.body
       try {
        
       } catch (error) {
        
       }
}