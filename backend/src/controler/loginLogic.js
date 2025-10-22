import Account from "../models/account.js";

export const createAccount = async(req,res) => {
    try{
        const {userName} = req.body
        const {accountName} = req.body
        const {passW} = req.body
        
        const checkExisUser = await Account.findOne({accountName})

        if(!checkExisUser){
            const account = new Account({userName, accountName, passW})
            const newAccount = await account.save()
            res.status(200).json({message: true, userName: newAccount["userName"]})
        }else{
            res.status(404).json("Account Name invalid!")
        }
    }catch(error){
        console.error("ERROR signup")
    }
}

export const loginAccount = async(req, res) => {
    try{
        const {accountName, pasW} = req.body
        
        const checkAccountName = await Account.findOne({accountName})

        if(!checkAccountName){ return res.json({message: fasle})}
        if(checkAccountName.pasW != pasW)
            {
                return res.json({message: fasle})
            }else{
                return res.json({message: true, userName: checkAccountName})
            }
    }catch(error){
        console.error("ERROR login")
    }
}
