import sqlite3

current_block = []
blocks = []
vocabDetail = []

with open("dict/english-vietnamese.txt", "r", encoding="utf-8") as f:
    for l in f:
        line = l.strip()
        if not line:
            continue
        if line.startswith("@"):
            if current_block:
                blocks.append(current_block)
                current_block = []
        current_block.append(line)
    if current_block:
        blocks.append(current_block)
for block in blocks:
    detail = {"vocab": "", "pron": "", "type": "", "meaning": "", "example": ""}
    for line in block:
        if line.startswith("@"):
            parts = line.split("/")
            detail["vocab"] = parts[0].lstrip("@").strip()
            if len(parts) > 1:
                detail["pron"] = "/" + parts[1].strip() + "/"
        elif line.startswith("*"):
            detail["type"] = line.lstrip("*").strip()
        elif line.startswith("-"):
            detail["meaning"] += line.lstrip("-").strip() + " "
        elif line.startswith("="):
            detail["example"] += line.lstrip("=").strip() + " "
    vocabDetail.append(detail)

conn = sqlite3.connect("dictionary.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS dictionary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vocab TEXT,
    pron TEXT,
    type TEXT,
    meaning TEXT,
    example TEXT
)
""")

for word in vocabDetail:
    cursor.execute("""
        INSERT INTO dictionary (vocab, pron, type, meaning, example)
        VALUES (?, ?, ?, ?, ?)
    """, (word["vocab"], word["pron"], word["type"], word["meaning"], word["example"]))

conn.commit()
conn.close()
