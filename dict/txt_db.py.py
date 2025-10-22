import sqlite3

current_block = []
blocks = []
vocabDetail = []
with open("dict/english-vietnamese.txt", "r", encoding="utf-8") as f:
    for l in f:
        if l.strip().startswith("@"):
            if current_block:
                blocks.append(current_block)
                current_block = []
        current_block.append(l)
    if current_block:
       blocks.append(current_block)
    
for block in blocks:
    detail = {"vocab": "","type":"", "meaning": "", "example":""}
    for line in block:
        if "@" in line:
            detail["vocab"] = line.strip().lstrip("@")
        elif "*" in line:
            detail["type"] = line.strip().lstrip("*")
        elif "-" in line:
            detail["meaning"] = line.strip().lstrip("-")
        elif "=" in line:
            detail["example"] = line.strip().lstrip("=")
    vocabDetail.append(detail)
print(vocabDetail[1]) 

# save to database sql lite
conn = sqlite3.connect("dictionary.db")  # Tạo hoặc mở file database
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS dictionary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vocab TEXT,
    type TEXT,
    meaning TEXT,
    example TEXT
)
""")

# --- Thêm dữ liệu vào bảng ---
for word in vocabDetail:
    cursor.execute("""
        INSERT INTO dictionary (vocab, type, meaning, example)
        VALUES (?, ?, ?, ?)
    """, (word["vocab"], word["type"], word["meaning"], word["example"]))

conn.commit()
conn.close()

print(f"Đã lưu {len(vocabDetail)} từ vựng vào database dictionary.db")