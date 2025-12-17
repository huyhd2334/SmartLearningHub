import csv
import json

csv_file = "dict/toeic_dict.csv"
json_file = "dict/toeic_dict.json"

data = []

with open(csv_file, mode="r", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    for row in reader:
        data.append(row)

with open(json_file, mode="w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Done!")
