import levelLangue from "../models/levelLangue.js";

export const choseLangue = async(req, res) => {
    try{
        const {accountName, langue, currentlevel} = req.body
        const user = await levelLangue.findOne({accountName})
        if (user){
        await levelLangue.updateOne({accountName},
                                                     {$set: {currentlevel: currentlevel, langue: langue}},
                                                     { upsert: true })}
        res.json({message: true})
    }catch(error){
        console.error("ERROR choseLevel")
    }
}
