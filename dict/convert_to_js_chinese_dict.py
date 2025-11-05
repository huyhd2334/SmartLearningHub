import json
import re

input_path = "dict/Chinese - Vietnamese.csv"
output_path = "dict/chinese_dict.json"

entries = []  # 🔥 Dùng list thay vì dict

with open(input_path, "r", encoding="utf-16") as f:
    next(f)  # Bỏ qua dòng đầu tiên nếu có tiêu đề
    for line in f:
        line = line.strip()
        if not line:
            continue

        # Tách phần từ Hán
        parts = line.split(",", 1)
        chinese_word = parts[0].strip()
        rest = parts[1].strip() if len(parts) > 1 else ""

        # Lấy danh sách nghĩa tiếng Anh
        english_matches = re.findall(r"\{([^}]+)\}", rest)
        english_list = [e.strip() for e in english_matches]

        # Lấy nghĩa tiếng Việt
        vietnamese_text = re.sub(r"\{[^}]+\}", "", rest)
        vietnamese_text = vietnamese_text.replace("|=", "").strip()

        # Thêm vào danh sách
        entries.append({
            "vocab": chinese_word,
            "meaning": vietnamese_text,
            "english": english_list,
            "synonyms": []
        })

# --- Ghi ra file JSON ---
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(entries, f, ensure_ascii=False, indent=2)

print(f"✅ Đã chuyển thành công: {output_path}")
