import sqlite3 from "sqlite3";
import { open } from "sqlite";
import ChineseDict from "../models/chinese/chineseDictAllWord.js"
// Done
export const fetchVocabTo = async(req,res) => {
    try {
    const { offset, langue } = req.body;
    if(langue === "english"){
        const offsetInt = parseInt(offset) || 0;
        const limit = 100
        const db = await openDB();
        const rows = await db.all(`SELECT * FROM dictionary LIMIT ? OFFSET ?`, [limit, offsetInt]);
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

const openDB = async () => {
  return open({
    filename: "dictionary.db",
    driver: sqlite3.Database
  });
};