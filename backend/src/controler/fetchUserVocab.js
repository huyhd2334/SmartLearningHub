import UserVocabs from "../models/userVocab.js";

export const FetchUserVocab = async(req,res) => {
    try{
        const {accountName} = req.body
        const Vocabs = await UserVocabs.find({ accountName });
        res.status(200).json(Vocabs)
    }catch(error){
        console.error(error)
    }
}

export const AddUserVocab = async(req,res) => {
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
            res.status(200).json({message: "addnewvocab" })
        }
    }catch(error){
        console.error(error)
    }
}
