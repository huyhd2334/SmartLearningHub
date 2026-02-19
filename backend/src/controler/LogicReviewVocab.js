import UserVocabs from "../models/english/englishUserVocab.js";
import ChineseUserVocabs from "../models/chinese/chineseUserVocab.js";

export const spacedRepetition = async ({ userAccount, vocab, langue, iscorrect }) => {
  try {
    let model;

    if (langue === "english") {
      model = UserVocabs;
    } else {
      model = ChineseUserVocabs;
    }

    let update = await model.findOne({ userAccount, vocab });

    if (!update) {
      console.log("Vocab not found");
      return;
    }

    if (iscorrect) {
      await model.updateOne(
        { userAccount, vocab },
        { $inc: { correct: 1, level: 1 } }
      );
    } else {
      await model.updateOne(
        { userAccount, vocab },
        { $inc: { incorrect: 1, level: -1 } }
      );
    }

    const risk = calRisk(update);

    await model.updateOne(
      { userAccount, vocab },
      {
        $set: {
          risk,
          last_review_result: iscorrect,
          last: new Date()
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};



const calRisk = (update) => {
      const today = new Date();
      const last = new Date(update.last);
      const space = (today - last) / (1000 * 60 * 60 * 24)
      let risk = update.vocab.lenght()*0.2 + space*0.3 + update.incorrect*0.2 - update.correct*0.1 + update.level*0.2
      return risk 
}