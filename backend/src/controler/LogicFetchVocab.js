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
    try {
       console.log("frontend call backend to get topics")
       const {langue} = req.body;
       if(langue === "english"){
         const topics = await Dict.distinct("topic")
         if(topics){
            console.log("send topics: ", topics)
            res.status(200).json({topics: topics})
         }else{res.status(500).send("error when get topics from mongo")
               console.log("error send topic")
         }
       }
    } catch (error) {
      console.log("error sever when get topic", error)
      res.status(500).send("error sever when get topic", error)
   }
}