// backend/src/controller/fetchTextFromImg.js
import multer from "multer";
import axios from "axios";

// Multer memory storage
const upload = multer({ storage: multer.memoryStorage() });

// Middleware handler
export const imageToTextHandler = [
  upload.single("file"), // expect field name = "file"
  async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      // Convert buffer -> base64
      const base64 = `data:image/jpeg;base64,${req.file.buffer.toString("base64")}`;
      console.log("BASE64 PREFIX:", base64.slice(0, 50));

      // OCR.Space API
      const OCR_SPACE_API_KEY = "K88629564188957";
      const formData = new URLSearchParams();
      formData.append("base64Image", base64);
      formData.append("language", "chs"); // eng / chs / vie
      formData.append("isOverlayRequired", "false");

      const response = await axios.post(
        "https://api.ocr.space/parse/image",
        formData.toString(),
        {
          headers: {
            apikey: OCR_SPACE_API_KEY,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const parsedText = response.data.ParsedResults?.[0]?.ParsedText || "";
      console.log("OCR RESULT:", parsedText);

      res.json({ text: parsedText });
    } catch (err) {
      console.error("OCR ERROR:", err.response?.data || err.message);
      res.status(500).json({ error: "OCR failed" });
    }
  },
];
