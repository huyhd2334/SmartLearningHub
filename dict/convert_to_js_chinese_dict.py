import json
import re
from pypinyin import pinyin, Style

input_path = "dict/Chinese - Vietnamese.csv"
output_path = "dict/chinese_dict.json"

entries = []

with open(input_path, "r", encoding="utf-16") as f:
    next(f)  # Bỏ qua dòng đầu tiên nếu có tiêu đề
    for line in f:
        line = line.strip()
        if not line:
            continue

        parts = line.split(",", 1)
        chinese_word = parts[0].strip()
        rest = parts[1].strip() if len(parts) > 1 else ""

        # Lấy danh sách nghĩa tiếng Anh (trong {...})
        english_matches = re.findall(r"\{([^}]+)\}", rest)
        english_list = [e.strip() for e in english_matches]

        # Lấy nghĩa tiếng Việt (phần còn lại)
        vietnamese_text = re.sub(r"\{[^}]+\}", "", rest)
        vietnamese_text = vietnamese_text.replace("|=", "").strip()

        pinyin_text = ' '.join([item[0] for item in pinyin(chinese_word, style=Style.TONE3)])

        entries.append({
            "vocab": chinese_word,
            "pinyin": pinyin_text,
            "meaning": vietnamese_text,
            "english": english_list,
            "synonyms": []
        })

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print(f"✅ Đã thêm Pinyin và xuất ra file: {output_path}")
