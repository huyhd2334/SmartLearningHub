import UserVocabs from "../models/english/englishUserVocab.js";
import ChineseUserVocabs from "../models/chinese/chineseUserVocab.js";

export const vocabReview = async(req, res) => {
      try {
        const {accountName, langue} = req.body
        if(!accountName || !langue){
          console.log("account name or langue undefine")
          return res.status(500).json({success: false})
        }
        let model;
        
        if(langue === "english"){
          model = UserVocabs
        }else{model = ChineseUserVocabs}
        
        const topRisk = await model.find({accountName}).sort({risk: -1}).skip(0).limit(10)

        if(topRisk){
          console.log(topRisk)
          return res.status(200).json({success: true, vocabs: topRisk})
        }else{return res.status(500).json({success: false})}
      } catch (error) {
        console.error(error)
        console.log("error when get top risk on backend phase")
      }
}

export const spacedRepetition = async ({ accountName, vocab, langue, iscorrect }) => {
  try {
    let model
    
    if (langue === "english") {
      model = UserVocabs
    } else {
      model = ChineseUserVocabs
    }
    console.log("model", model)
    console.log("vocab", vocab)
    console.log("is correct", iscorrect)
    const update = await model.findOne({ accountName, vocab })

    if (!update) {
      console.log("Vocab not found");
      return
    }

    if (iscorrect) {
      await model.updateOne(
        { accountName, vocab },
        { $inc: { correct: 1, level: 1 } }
      )
    } else {
      await model.updateOne(
        { accountName, vocab },
        { $inc: { incorrect: 1, level: -1 } }
      )
    }

    let risk = calRisk(update);
    
    if(!iscorrect){risk += 5}

    await model.updateOne({ accountName, vocab },{$set: {risk,
                                                  last_review_result: iscorrect,
                                                  last: new Date()}})
    return risk
  } catch (error) {
    console.error(error);
  }
};



const calRisk = (update) => {
      const today = new Date();
      const last = new Date(update.last);
      const space = (today - last) / (1000 * 60 * 60 * 24)
      let risk = update.vocab.length*0.2 + space*0.3 + update.incorrect*0.2 - update.correct*0.1 - update.level*0.2
      return risk 
}