import levelLangue from "../models/levelLangue.js";

export const choseLangue = async(req, res) => {
    try{
        const {accountName, langue, currentlevel} = req.body
        const user = await levelLangue.findOne({accountName})
        const last = user.lastLogin || new Date(0)
        const now = new Date()
        
        if (last.toDateString() !== now.toDateString()){
        const newLevel = await levelLangue.updateOne({accountName},
                                                     {$set: {currentlevel: currentlevel, langue: langue, lastLogin: Date.now()},
                                                      $inc: { streak : 1 }},
                                                     { upsert: true })}
        else{
        const newLevel = await levelLangue.updateOne({accountName},
                                                     {$set: {currentlevel: currentlevel, langue: langue, lastLogin: Date.now()}},
                                                     { upsert: true })}
        res.json({message: true})
    }catch(error){
        console.error("ERROR choseLevel")
    }
}
