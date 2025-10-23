import Reading from "../models/news.js"; 

export const newReading = async(req, res) => {
    try{
        const {author, title, content,urlToImage} = req.body
        const newRead = await Reading.create({author, title, content,urlToImage, createDate: Date.now()})
        res.status(201).json({
        message: "✅ New reading article saved successfully!",
        data: newRead,})
    }catch(error){}
}