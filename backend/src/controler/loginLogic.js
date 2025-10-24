import Account from "../models/account.js";

export const createAccount = async(req,res) => {
    try{
        const {userName} = req.body
        const {accountName} = req.body
        const {passW} = req.body
        
        const checkExisUser = await Account.findOne({accountName})

        if(!checkExisUser){
            const account = new Account({userName, accountName, passW, lastLogin: Date.now()})
            await account.save()
            res.status(200).json({message: true})
        }else{
            res.status(404).json("Account Name invalid!")
        }
    }catch(error){
        console.error("ERROR signup")
    }
}

export const loginAccount = async (req, res) => {
    try {
        const { accountName, passW } = req.body;

        const checkAccountName = await Account.findOne({ accountName });
        if (!checkAccountName) {
            return res.json({ message: false });
        }

        if (checkAccountName.passW !== passW) {
            return res.json({ message: false });
        }

        const last = new Date(checkAccountName.lastLogin);
        const now = new Date();

        if (last.toDateString() !== now.toDateString()) {
            checkAccountName.streak += 1;
            checkAccountName.lastLogin = now;
            await checkAccountName.save();
        }
        return res.json({message: true, streak: checkAccountName.streak,});
    } catch (error) {
        console.error("ERROR login:", error);
        res.status(500).json({ message: false, error: "Internal server error" });
    }
};

