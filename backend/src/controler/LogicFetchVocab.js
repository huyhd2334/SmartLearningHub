import sqlite3 from "sqlite3";
import ChineseDict from "../models/chinese/chineseDictAllWord.js"
import Dict from "../models/english/englishDictAllWord.js"

export const getAllVocabs = async(req,res) => {
    try {
    const { offset, langue } = req.body
    if(langue === "english"){
        const offsetInt = parseInt(offset) || 0;
        const limit = 50
        if(offsetInt === 0){
           const rows = await Dict.find()
           return res.status(200).json({message: true, rows})
        }
        const rows = await Dict.find().skip(offsetInt).limit(limit)
        return res.status(200).json({message: true, rows})
    }else{
      // chinese
        const offsetInt = parseInt(offset) || 0
        const limit = 100
        if(offsetInt === 0){
           const rows = await Dict.find()
           return res.status(200).json({message: true, rows})
        }
        const rows = await ChineseDict.find().skip(offsetInt).limit(limit)
        res.status(200).json({message: true, rows})
    }
    }catch(err){
        console.error(err)
        res.status(500).json({message: false, detail: "Database error" })}  
}

export const getAllVocabsTopic =  async(req, res) => {
    try {
       console.log("frontend call backend to get topics")
       const {langue, topic} = req.body
       if(langue === "english" && topic === ""){
         const topics = await Dict.distinct("topic")
         if(topics){
            console.log("send topics: ", topics)
            return res.status(200).json({topics: topics})
         }else{res.status(500).send("error when get topics from mongo")
            return console.log("error send topic")
         }
       }
       if(langue === "english"){
         const vocabs = await Dict.find({topic: topic})
         if(vocabs){
            console.log("send vocabs: ", vocabs)
            return res.status(200).json({vocabs: vocabs})
         }else{res.status(500).send("error when get vocabs from mongo")
            return console.log("error send vocab topic")
         }
       }
    } catch (error) {
      console.log("error sever when get topic", error)
      res.status(500).send("error sever when get topic", error)
   }
}
