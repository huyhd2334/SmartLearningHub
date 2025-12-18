import Dict from "../models/english/englishDictAllWord.js"

const PREFIXES = ["un", "re", "pre", "mis", "dis", "in", "im", "non"];
const SUFFIXES = ["tion", "sion", "ing", "ed", "able", "ible", "ment", "ness"];

function checkPrefix(word) {
  for (const p of PREFIXES) {
    if (word.startsWith(p) && word.length > p.length + 2) {
      return p;
    }
  }
  return "";
}

function checkSuffix(word) {
  for (const s of SUFFIXES) {
    if (word.endsWith(s) && word.length > s.length + 2) {
      return s;
    }
  }
  return "";
}


export const getVocabForSurvey = async (req, res) => {
  try {
    const { number, offset} = req.body;

    const rows = await collection.find({}, { projection: { _id: 0, vocab: 1 } }).skip(Number(offset)).limit(Number(number)).toArray();
    const result = rows.map((row) => {
      const word = row.vocab;
      return {
        word,
        length_word: word.length,
        prefix: checkPrefix(word),
        suffix: checkSuffix(word),
      };
    });

    res.status(200).json({
      form_title: "Vocabulary Survey",
      words: result,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
