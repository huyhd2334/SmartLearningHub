import levelLangue from "../models/english/levelLangue.js";
import ChineseLevelLangue from "../models/chinese/chineseLevelLangue.js";

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
                res.json({message: true})       
            }else{
                await ChineseLevelLangue.updateOne({accountName},
                                            {$set: {currentlevel: currentlevel, langue: langue}},
                                            { upsert: true })}
                res.json({message: true})   
    }catch(error){console.error("ERROR choseLevel")}
}
