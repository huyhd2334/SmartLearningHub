import UserVocabs from "../models/english/userVocab.js";
import ChineseUserVocabs from "../models/chinese/chineseUserVocab.js"
export const FetchUserVocab = async(req,res) => {
    try{
        const {accountName, level, langue} = req.body
        if (langue === "english"){
            if(!level){ 
                const Vocabs = await UserVocabs.find({ accountName});
                res.status(200).json(Vocabs)
            }else{
                const Vocabs = await UserVocabs.find({ accountName, level});
                res.status(200).json(Vocabs)
            }
        }else{
            if(!level){ 
                const Vocabs = await ChineseUserVocabs.find({ accountName});
                res.status(200).json(Vocabs)
            }else{
                const Vocabs = await ChineseUserVocabs.find({ accountName, level});
                res.status(200).json(Vocabs)
            }
        }
    }catch(error){
        console.error(error)
    }
}

export const AddUserVocab = async(req,res) => {
    try{
        const {langue} = req.body
        if(langue === "english"){
            try{
                const {accountName, vocab, pron, type, meaning,example} = req.body
                const vocabUpdate = await UserVocabs.findOne({ accountName, vocab });
                if(vocabUpdate){
                    await UserVocabs.updateOne(
                                                { accountName, vocab },
                                                { $inc: { level: 1 } }
                                                );
                    res.status(200).json({message: "updatelevel" })
                }else{
                    await UserVocabs.create({ accountName, vocab, pron , type, meaning, example, level: 0 });
                    res.status(200).json({message: "addnewvocab" })}
            }catch(error){console.error(error)}
        }else{
            try{
                const {accountName, vocab, meaning, english} = req.body
                const vocabUpdate = await ChineseUserVocabs.findOne({ accountName, vocab });
                if(vocabUpdate){
                    await ChineseUserVocabs.updateOne(
                                                { accountName, vocab },
                                                { $inc: { level: 1 } }
                                                );
                    res.status(200).json({message: "updatelevel" })
                }else{
                    await ChineseUserVocabs.create({ accountName, vocab, meaning, english, level: 0 });
                    res.status(200).json({message: "addnewvocab" })}
            }catch(error){console.error(error)}
        }
    }catch(error){
        console.error(error)}
}
