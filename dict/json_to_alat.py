import json
from pymongo import MongoClient

# ✅ 1. Kết nối MongoDB Atlas
uri = "mongodb+srv://huyqame1356_db_user:LYro7tMJSXTKoFmY@cluster0.g9pgtew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["test"]  # tên database
collection = db["chinese_dict"]  # tên collection

# ✅ 2. Đọc file JSON
with open("dict/chinese_dict.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# ✅ 3. Chuyển đổi sang dạng list để insert
converted = []
for value in data:
    entry = {
        "vocab": value.get("vocab", ""),
        "meaning": value.get("meaning", ""),
        "english": value.get("english", "")
    }
    converted.append(entry)


# ✅ 4. Xóa dữ liệu cũ (tùy chọn)
collection.delete_many({})
print("🗑️ Old data cleared")

# ✅ 5. Chèn dữ liệu mới
collection.insert_many(converted)
print("🚀 Upload success!")

# ✅ 6. Đóng kết nối
client.close()
print("✅ Done!")
