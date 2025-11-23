import UserVocabs from "../models/english/userVocab.js";
import ChineseUserVocabs from "../models/chinese/chineseUserVocab.js";

export const countFlashCard = async(req, res) => {
    const {user, langue} = req.body
    if(langue === "english"){
        const level_0 = await UserVocabs.countDocuments({ level: 0, accountName: user });
        const level_1 = await UserVocabs.countDocuments({ level: 1, accountName: user });
        const level_2 = await UserVocabs.countDocuments({ level: 2, accountName: user });
        const level_3 = await UserVocabs.countDocuments({ level: 3, accountName: user });
        const level_4 = await UserVocabs.countDocuments({ level: 4, accountName: user });
        const level_5 = await UserVocabs.countDocuments({ level: 5, accountName: user });
        const level_6 = await UserVocabs.countDocuments({ level: 6, accountName: user });
        const data = [level_0,level_1, level_2, level_3, level_4, level_5, level_6]
        res.status(202).json({dataFlashCard: data})
    }
    else{
        const level_0 = await ChineseUserVocabs.countDocuments({ level: 0 , accountName: user });
        const level_1 = await ChineseUserVocabs.countDocuments({ level: 1, accountName: user });
        const level_2 = await ChineseUserVocabs.countDocuments({ level: 2, accountName: user });
        const level_3 = await ChineseUserVocabs.countDocuments({ level: 3, accountName: user });
        const level_4 = await ChineseUserVocabs.countDocuments({ level: 4, accountName: user });
        const level_5 = await ChineseUserVocabs.countDocuments({ level: 5, accountName: user });
        const level_6 = await ChineseUserVocabs.countDocuments({ level: 6, accountName: user });
        
        const data = [level_0,level_1, level_2, level_3, level_4, level_5, level_6]
        res.status(202).json({dataFlashCard: data})
    }
}

export const countAllVocabs = async(req, res) => {
    const {user, langue} = req.body
    if(langue === "english"){
        let totalVocab = await UserVocabs.countDocuments({accountName: user })
        res.status(202).json({totalVocab: totalVocab})
    }else{
        let totalVocab = await ChineseUserVocabs.countDocuments({accountName: user })
        res.status(202).json({totalVocab: totalVocab})
    }
}

