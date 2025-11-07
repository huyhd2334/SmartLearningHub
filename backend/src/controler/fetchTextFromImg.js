// pages/api/imagetotext.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body;

    if (!image) {
      console.log("⚠️ No image received");
      return res.status(400).json({ error: "Image is required" });
    }

    // 🔹 Debug client gửi lên
    console.log("✅ IMAGE RECEIVED");
    console.log("PREFIX CHECK:", image.substring(0, 30));  // in prefix
    console.log("LENGTH:", image.length);                  // in độ dài base64

    const OCR_SPACE_API_KEY = "K88629564188957";

    const formData = new URLSearchParams();
    formData.append("base64Image", image);           
    formData.append("language", "chs");          
    formData.append("isOverlayRequired", "false");

    // 🔹 Gửi sang OCR.Space
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

    // 🔹 Debug OCR response
    console.log("✅ OCR RESULT RAW:", response.data);
    console.log("OCRExitCode:", response.data.OCRExitCode);
    if (response.data.ParsedResults) {
      console.log("ParsedText (first 200 chars):", response.data.ParsedResults[0].ParsedText.substring(0, 200));
    } else {
      console.log("No ParsedResults, check ErrorMessage:", response.data.ErrorMessage);
    }

    const parsedText = response.data.ParsedResults?.[0]?.ParsedText || "";

    // 🔹 Trả về client
    res.status(200).json({ text: parsedText });

  } catch (error) {
    console.error("❌ OCR ERROR:", error.response?.data || error.message);
    res.status(500).json({ error: "OCR failed" });
  }
}
