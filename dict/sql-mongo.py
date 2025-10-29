import sqlite3
from pymongo import MongoClient
from tqdm import tqdm

# 🔹 Cấu hình
DB_PATH = "dict/dictionary.db"          # File SQLite cũ
TABLE_NAME = "dictionary"               # Bảng SQLite bạn muốn chuyển
MONGO_URI = "mongodb+srv://huyqame1356_db_user:LYro7tMJSXTKoFmY@cluster0.g9pgtew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  # MongoDB local
DB_NAME = "test"                        # Database MongoDB
COLLECTION_NAME = "dictionary_new"      # Tên collection MongoDB mới
BATCH_SIZE = 1000                        # Số document insert mỗi lần (tăng tốc)

# 🔹 Kết nối SQLite
sqlite_conn = sqlite3.connect(DB_PATH)
sqlite_cursor = sqlite_conn.cursor()

# 🔹 Kết nối MongoDB
mongo_client = MongoClient(MONGO_URI)
mongo_db = mongo_client[DB_NAME]
mongo_col = mongo_db[COLLECTION_NAME]

# 🔹 Lấy dữ liệu từ SQLite
sqlite_cursor.execute(f"SELECT * FROM {TABLE_NAME}")
columns = [desc[0] for desc in sqlite_cursor.description]
rows = sqlite_cursor.fetchall()

# 🔹 Chia batch và insert_many()
for i in tqdm(range(0, len(rows), BATCH_SIZE), desc=f"Đang chuyển bảng {TABLE_NAME}"):
    batch = rows[i:i+BATCH_SIZE]
    docs = [dict(zip(columns, row)) for row in batch]
    mongo_col.insert_many(docs)

sqlite_conn.close()
mongo_client.close()

print(f"✅ Đã chuyển xong bảng '{TABLE_NAME}' sang collection '{COLLECTION_NAME}'!")
