import sqlite3

# Đường dẫn đến file database (đặt đúng chỗ)
db_path = "dictionary.db"   # hoặc "dict/dictionary.db"

try:
    # Mở kết nối
    conn = sqlite3.connect(db_path)
    print("✅ Kết nối DB thành công!")

    # Tạo con trỏ để thực thi lệnh SQL
    cursor = conn.cursor()

    # Kiểm tra các bảng hiện có
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    if not tables:
        print("⚠️ Database KHÔNG có bảng nào.")
    else:
        print("📋 Danh sách bảng trong DB:")
        for t in tables:
            print(" -", t[0])

    # Kiểm tra xem bảng 'dictionary' có tồn tại không
    cursor.execute("""
        SELECT name FROM sqlite_master 
        WHERE type='table' AND name='dictionary';
    """)
    exists = cursor.fetchone()
    if exists:
        print("✅ Bảng 'dictionary' tồn tại trong DB.")
    else:
        print("❌ Không tìm thấy bảng 'dictionary' trong DB.")

except sqlite3.Error as e:
    print("❌ Lỗi SQLite:", e)
finally:
    conn.close()
