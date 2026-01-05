// import levelLangue from "../models/english/englishLevelLangue.js";
// import ChineseLevelLangue from "../models/chinese/chineseLevelLangue.js";
import Account from "../models/account.js";

// Done
export const choseLangue = async(req, res) => {
    try{
        const {accountName, langue} = req.body
        const account = await Account.findOne({accountName: accountName})
        if (account){
            if(langue === "english"){
                const last = new Date(account.lastLogin)
                const today = new Date()

                last.setHours(0, 0, 0, 0)
                today.setHours(0, 0, 0, 0)

                const yesterday = new Date(today)
                yesterday.setDate(today.getDate() - 1)

                console.log({last: last.getTime(), yesterday: yesterday.getTime(), today: today.getTime()})

                if (last.getTime() === yesterday.getTime() && last.getTime() - yesterday.getTime() <= 86400000){
                    account.streakEnglish += 1
                } else {account.streakEnglish = 1}

                account.lastLogin = today
                await account.save()
                return res.json({message: true, streak: account.streakEnglish})       
            }else{
                const last = new Date(account.lastLogin)
                const today = new Date()

                last.setHours(0, 0, 0, 0)
                today.setHours(0, 0, 0, 0)

                const yesterday = new Date(today)
                yesterday.setDate(today.getDate() - 1)

                console.log({last: last.getTime(), yesterday: yesterday.getTime(), today: today.getTime()})
                if (last.getTime() === yesterday.getTime() && last.getTime() - yesterday.getTime() <= 86400000) {
                   account.streakChinese += 1
                } else {account.streakChinese = 1}

                account.lastLogin = today
                await account.save()
                return res.json({message: true, streak: account.streakChinese}) 
            }
        }else{console.error("ERROR choselangue", error)}
    }catch(error){console.error("ERROR choselangue", error)}
}
