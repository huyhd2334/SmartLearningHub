import UserVocabs from "../models/english/englishUserVocab.js";
import ChineseUserVocabs from "../models/chinese/chineseUserVocab.js";

export const spacedRepetition = async({userAccount, vocab, langue}) => {
      try{
            if (langue === "english"){
                  let model = UserVocabs
            }else{let model = ChineseUserVocabs}
      
            update = await model.find({userAccount, vocab})
            if(!update){
            console.log("Vocab not found")
            return
            }
            risk = calRisk(update)
            await model.updateOne({userAccount, vocab}, {$set: {risk}})
      }catch (error) {
          console.error(error)     
      }}


const calRisk = (update) => {
      today = new Date()
      space = today.toLocaleDateString() - update.late.toLocaleDateString()
      risk = update.vocab.lenght()*0.2 + space*0.3 + update.incorrect*0.2 - update.correct*0.1 + update.level*0.2
      return risk 
}