import UserVocabs from "../models/english/englishUserVocab.js";
import ChineseUserVocabs from "../models/chinese/chineseUserVocab.js"
export const FetchUserVocab = async(req,res) => {
    try{
        const {accountName, level, langue} = req.body
        if (langue === "english"){
            if(level === undefined || level === null){ 
                const vocabs = await UserVocabs.find({ accountName});
                res.status(200).json({vocabs: vocabs})
            }else{
                const level = req.body.level !== undefined ? Number(req.body.level) : undefined;
                console.log("Backend got level:", level);
                const vocabs = await UserVocabs.find({ accountName: accountName , level: level});
                res.status(200).json({vocabs: vocabs})
            }
        }else{
            if(level === undefined || level === null){ 
                const vocabs = await ChineseUserVocabs.find({ accountName});
                res.status(200).json({vocabs: vocabs})
            }else{
                const level = req.body.level !== undefined ? Number(req.body.level) : undefined;
                console.log("Backend got level:", level);
                const vocabs = await ChineseUserVocabs.find({ accountName, level});
                res.status(200).json({vocabs: vocabs})
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
                console.log("Backend got vocab:", accountName, vocab, pron, type, meaning,example)
                const vocabUpdate = await UserVocabs.findOne({ accountName, vocab });
                if(vocabUpdate){
                    await UserVocabs.updateOne(
                                                { accountName, vocab },
                                                { $inc: { level: 1 } }
                                                );
                    res.status(200).json({message: "updatelevel" })
                    console.log("Update result:", vocabUpdate)
                }else{
                    await UserVocabs.create({ accountName, vocab, pron , type, meaning, example, level: 0 });
                    console.log("Add vocab:", vocab)
                    res.status(200).json({message: "addnewvocab" })}
            }catch(error){console.error(error)}
        }else{
            try{
                const {accountName, vocab, meaning, english, pinyin} = req.body
                const vocabUpdate = await ChineseUserVocabs.findOne({ accountName, vocab });
                if(vocabUpdate){
                    await ChineseUserVocabs.updateOne(
                                                { accountName, vocab },
                                                { $inc: { level: 1 } }
                                                );
                    res.status(200).json({message: "updatelevel" })
                }else{
                    await ChineseUserVocabs.create({ accountName, vocab, meaning, english, pinyin, level: 0 });
                    res.status(200).json({message: "addnewvocab" })}
            }catch(error){console.error(error)}
        }
    }catch(error){
        console.error(error)}
}
