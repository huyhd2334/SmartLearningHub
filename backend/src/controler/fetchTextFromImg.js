import axios from "axios";

export default async function imageToText(req, res) {
  try {
    const { image } = req.body; // image là base64 string
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Thay YOUR_API_KEY bằng API key từ OCR.Space
    const OCR_SPACE_API_KEY = "K88629564188957";

    const formData = new URLSearchParams();
    formData.append("base64Image", image);
    formData.append("language", "eng+chs"); // 'vie' nếu muốn OCR tiếng Việt

    const response = await axios.post(
      "https://api.ocr.space/parse/image",
      formData.toString(),
      {
        headers: {
          "apikey": OCR_SPACE_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }
    );

    const parsedText = response.data.ParsedResults?.[0]?.ParsedText || "";

    res.json({ text: parsedText });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "OCR failed" });
  }
}
