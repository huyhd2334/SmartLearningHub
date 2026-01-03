import levelLangue from "../models/english/englishLevelLangue.js";
import ChineseLevelLangue from "../models/chinese/chineseLevelLangue.js";
import Account from "../models/account.js";
// Done
export const choseLangue = async(req, res) => {
    try{
        const {accountName, langue, currentlevel} = req.body
        const user = await levelLangue.findOne({accountName})
        if (user){
            if(user["langue"] === "english"){
                await levelLangue.updateOne({accountName},
                                            {$set: {currentlevel: currentlevel, langue: langue}},
                                            { upsert: true })}

                const account = await Account({accountName: user})
                const last = new Date(account.lastLogin);
                const now = new Date();
                
                now.setDate(last.getDate() - 1)
                now.setHours(0,0,0,0)
                
                last = setHours(0,0,0,0)

                if (last.getTime() === now.getTime()) {
                    account.streakEnglish += 1;
                    account.lastLogin = now;
                    await account.save();
                }
                return res.json({message: true, streak: account.streakEnglish})       
            }else{
                await ChineseLevelLangue.updateOne({accountName},
                                            {$set: {currentlevel: currentlevel, langue: langue}},
                                            { upsert: true })}
            
                const account = await Account({accountName: user})
                const last = new Date(account.lastLogin);
                const now = new Date();
                
                now.setDate(last.getDate() - 1)
                now.setHours(0,0,0,0)
                
                last.setHours(0,0,0,0)

                if (last.getTime() === now.getTime()) {
                    account.streakChinese += 1;
                    account.lastLogin = now;
                    await account.save();
                }
                return res.json({message: true, streak: account.streakChinese}) 
    }catch(error){console.error("ERROR choseLevel", error)}
}
