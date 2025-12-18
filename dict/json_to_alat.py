import json
from pymongo import MongoClient

uri = "mongodb+srv://huyqame1356_db_user:LYro7tMJSXTKoFmY@cluster0.g9pgtew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["test"]
collection = db["dictionary_new"]  

with open("dict/toeic_dict.json", "r", encoding="utf-8") as f:
    data = json.load(f)

converted = []
for value in data:
    entry = {
        "vocab": value.get("english", ""),
        "pron": value.get("pronounce", ""),
        "type": value.get("type", ""),
        "meaning": value.get("vietnamese", ""),
        "example": value.get("example", ""),
        "topic": value.get("topic", "")
    }
    converted.append(entry)


collection.delete_many({})
print("Old data cleared")

collection.insert_many(converted)
print("Upload success!")

client.close()
print(" Done!")
