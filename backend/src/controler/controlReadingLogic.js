import Reading from "../models/english/news.js";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import lemmatizer from 'wink-lemmatizer';
import Dict from "../models/english/dictAllWord.js";
import ChineseDict from "../models/chinese/chineseDictAllWord.js"
import ChineseReading from "../models/chinese/chineseReading.js"
// console.log(lemmatizer.verb('running'));  // run
// console.log(lemmatizer.noun('cars'));     // car
// console.log(lemmatizer.adjective('better')); // good
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const Segment = require("segment"); // CommonJS
const segment = new Segment();
import axios from "axios";


// Khởi tạo segment (tùy chọn có lọc stopword)
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
            const data = await Reading.find().sort({createDate: -1 }).limit(1)
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
        const db = await open({
            filename: "dictionary.db",
            driver: sqlite3.Database,
        });
        const {id, langue} = req.body;

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
        } else { // Chinese
            if(id) {
                const data = await ChineseReading.findById(id);
                if(data){
                    const chineseStopWords = new Set(["的","了","在","是","和","也","上","。","，","、"]);

                    // Dùng segment trực tiếp trên nội dung
                    const segmented = segment.doSegment(data.content);

                    // Lọc stopwords
                    const words = segmented
                    .map(w => w.w)               // lấy từ
                    .filter(w => !chineseStopWords.has(w));

                    console.log("Segmented words:", words);
                    res.status(200).json({ message: "oke", data: words });
                } else {
                    res.status(404).json({ message: "error" });
                }
            }

        }
    } catch(error) {
        console.error(error);
    }
}

const translateChineseWord = async (word) => {
  try {
    const res = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: "zh-CN",
        tl: "vi",
        dt: "t",
        q: word
      }
    });
    const meaning = res.data[0].map(item => item[0]).join("");
    return {
      vocab: word,
      pinyin: "", // Google API free không trả Pinyin
      meaning,
      english: "" // có thể thêm nếu muốn gọi tl: "en"
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
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
            let result = await ChineseDict.findOne({ vocab: word });
            if (result) return res.status(200).json({ message: "oke", detail: result });

            // fallback Google API
            const apiResult = await translateChineseWord(word);
            if (apiResult) return res.status(200).json({ message: "oke", detail: apiResult });

            return res.status(200).json({ message: "Not found" });
            }
    }catch(error) {
        console.error(error);
        return res.status(500).json({ message: "internal error" });
    }
};
