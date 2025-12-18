import json
import sys
import pandas as pd
from  pymongo import MongoClient

number_of_vocab = sys.argv[1]
number_of_offset = sys.argv[2]

uri = "mongodb+srv://huyqame1356_db_user:LYro7tMJSXTKoFmY@cluster0.g9pgtew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)

db = client["test"]
collection = db["dictionary_new"]
rows = collection.find({}, {"_id": 0, "vocab": 1}).skip(number_of_offset).limit(number_of_vocab)


PREFIXES = ["un", "re", "pre", "mis", "dis", "in", "im", "non"]
SUFFIXES = ["tion", "sion", "ing", "ed", "able", "ible", "ment", "ness"]

def checkPrefix(word):
    for p in PREFIXES:
        if word.startswith(p) and len(word) > len(p) + 2:
           return p
        else:
            return 0
def checkSuffix(word):
    for p in SUFFIXES:
        if word.endswith(p) and len(word) > len(p) + 2:
           return p
        else:
            return 0
        
listDatas = []

for row in rows:
    data = {"word": "", "word_length": "", "suffix": "", "prefix": ""}
    data["word"] = row["vocab"]
    data["word_length"] = len(row["vocab"])
    data["suffix"] = checkSuffix(row["vocab"])
    data["prefix"] = checkPrefix(row["vocab"])
    listDatas.append(data)


print(json.dump(listDatas, ensure_ascii=False, indent=2))




