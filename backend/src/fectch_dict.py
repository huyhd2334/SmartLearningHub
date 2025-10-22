import os
import requests
import sqlite3
import time

# --- Cấu hình ---
DB_FOLDER = "db"
DB_PATH = os.path.join(DB_FOLDER, "vocab.db")
WORDS = ["apple", "book", "computer", "study", "run"]  # danh sách từ test
API_URL = "https://api.glosbe.com/gapi/translate?from=eng&dest=vie&format=json&phrase={}"
SLEEP = 1  # giãn request tránh bị chặn

# --- Tạo thư mục db nếu chưa có ---
os.makedirs(DB_FOLDER, exist_ok=True)

# --- Kết nối SQLite ---
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()
cursor.execute('''
CREATE TABLE IF NOT EXISTS dictionary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word_en TEXT UNIQUE,
    word_vi TEXT
)
''')
conn.commit()

# --- Hàm lấy nghĩa ---
def fetch_meaning(word):
    try:
        r = requests.get(API_URL.format(word))
        r.raise_for_status()
        data = r.json()
        meanings = []
        for t in data.get("tuc", []):
            if "phrase" in t and "text" in t["phrase"]:
                meanings.append(t["phrase"]["text"])
        return "; ".join(meanings[:5])
    except Exception as e:
        print(f"Error fetching {word}: {e}")
        return None

# --- Lưu vào DB ---
for w in WORDS:
    cursor.execute("SELECT 1 FROM dictionary WHERE word_en = ?", (w,))
    if cursor.fetchone():
        print(f"SKIP: {w}")
        continue
    meaning = fetch_meaning(w)
    print(f"{w} -> {meaning}")
    cursor.execute(
        "INSERT OR IGNORE INTO dictionary (word_en, word_vi) VALUES (?, ?)",
        (w, meaning)
    )
    conn.commit()
    time.sleep(SLEEP)

conn.close()
print("✅ Done! Database created at:", DB_PATH)
