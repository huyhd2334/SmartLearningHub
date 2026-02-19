import Reading from "../models/english/englishReading.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import ChineseReading from "../models/chinese/chineseReading.js"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Segment = require("segment"); // CommonJS
const segment = new Segment();
import axios from "axios";

segment.useDefault();

sqlite3.verbose();

export const newReading = async(req, res) => {
    try{
        const {author, title, content,urlToImage, langue} = req.body
        if(langue === "english"){
            const newRead = await Reading.create({author, title, content, urlToImage, createDate: Date.now()})
            res.status(201).json({data: newRead,})
        }else{
            const newRead = await ChineseReading.create({author, title, content, urlToImage, createDate: Date.now()})
            res.status(201).json({data: newRead,})
        }
    }catch(error){
        console.error(error)
    }
}

export const sendReading = async(req, res) => {
    try{
        const {get, langue} = req.body
        if (get === "get" && langue === "english" ){
            const data = await Reading.find().sort({createDate: -1 }).limit(2)
            if(data){
                res.status(200).json({message: "oke", reading: data})
            }else{res.status(404).json({message: "error"})}
        }else{
            // chinese
            const data = await ChineseReading.find().sort({createDate: -1 }).limit(1)
            if(data){
                res.status(200).json({message: "oke", reading: data})
            }else{res.status(404).json({message: "error"})}
        }
    }catch(error){
        console.error(error)
    }
}

export const splitReading = async(req, res) => {
    try {
        const {id, langue, textChinese} = req.body;
        console.log("split reading", id, langue)
        if(!textChinese){
            if (langue === "english") {
                if (id) {
                    const data = await Reading.findById(id);
                    if(data){
                        const words = data.content
                            ? data.content.toLowerCase().replace(/[^a-zA-Z\s']/g, '').split(/\s+/)
                            : [];
                        const binary = words.map(() => 1);
                        res.status(200).json({message: "oke", data: binary});
                    } else {
                        res.status(404).json({message: "error"});
                    }
                }
            // Chinese
            } else {
                if(id) {
                    const data = await ChineseReading.findById(id);
                    if(data){
                        const chineseStopWords = new Set(["的","了","在","是","和","也","上","。","，","、"]);

                        const segmented = segment.doSegment(data.content);
                        const words = segmented
                        .map(w => w.w)             
                        .filter(w => !chineseStopWords.has(w));

                        console.log("Segmented words:", words);
                        res.status(200).json({ message: "oke", data: words });
                    } else {
                        res.status(404).json({ message: "error" });
                    }
                }
            }
        }else{
        // chinese app mobile
            const chineseStopWords = new Set(["的","了","在","是","和","也","上","。","，","、"]);
            const segmented = segment.doSegment(textChinese);
            const words = segmented
                    .map(w => w.w)
                    .filter(w => !chineseStopWords.has(w));
            console.log("Segmented words:", words);
                res.status(200).json({ message: "oke", data: words });
        }
    } catch(error) {
        console.error(error);
    }
}

export const callAPiTranslate = async (word) => {
  try {
    console.log("finddetail", word);

    if (!word || typeof word !== "string") {
      return { success: false, message: "Invalid word" };
    }

    const url = `https://dict.minhqnd.com/api/v1/lookup?word=${encodeURIComponent(word)}`;
    const { data } = await axios.get(url);
    
    console.log(data)

    if (!data || !Array.isArray(data.results) || data.results.length === 0) {
      return { success: false, message: "Word not found" };
    }
    return {success: true, detail: data.results};

  } catch (error) {
    console.error("Dictionary API error:", error.message);
    return {success: false, message: "Dictionary API failed"};
  }
};


export const FindDetail = async (req, res) => {
  try {
    const { word } = req.body;

    if (!word) {
      return res.status(500).json({success: false, message: "Word is required"})
    }

    const result = await callAPiTranslate(word);
    if (!result.success) {
      return res.status(500).json({success: false, message: "callAPI func error"});
    }
    
    const detail = result.detail

    console.log("send", result.detail[0].pronunciations)
    return res.status(200).json({success: true, detail});

  } catch (error) {
      console.error("FindDetail error:", error);
      return res.status(500).json({success: false, message: "Internal server error"});
  }
};
