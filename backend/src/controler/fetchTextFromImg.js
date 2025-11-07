import nextConnect from "next-connect";
import multer from "multer";
import fs from "fs";
import axios from "axios";

const upload = multer({ storage: multer.memoryStorage() });

const handler = nextConnect();
handler.use(upload.single("file"));

handler.post(async (req, res) => {
  try {
    const buffer = req.file.buffer;
    const base64 = `data:image/jpeg;base64,${buffer.toString("base64")}`;

    const OCR_SPACE_API_KEY = "K88629564188957";
    const formData = new URLSearchParams();
    formData.append("base64Image", base64);
    formData.append("language", "chs");
    formData.append("isOverlayRequired", "false");

    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      formData.toString(),
      { headers: { apikey: OCR_SPACE_API_KEY, "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const parsedText = response.data.ParsedResults?.[0]?.ParsedText || "";
    res.json({ text: parsedText });

  } catch (err) {
    console.error("OCR ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "OCR failed" });
  }
});

export const config = { api: { bodyParser: false } };
export default handler;
