import axios from "axios";

export default async function imageToText(req, res) {
  try {
    let { image } = req.body;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    console.log("IMAGE RECEIVED:", image.substring(0, 50));

    // ✅ Nếu base64 chưa có prefix → tự thêm vào (OCR.Space bắt buộc)
    if (!image.startsWith("data:")) {
      image = "data:image/png;base64," + image;
    }

    const OCR_SPACE_API_KEY = "K88629564188957";

    const formData = new URLSearchParams();
    formData.append("base64Image", image);
    formData.append("language", "chs");

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

    console.log("OCR RESULT:", response.data);

    const parsedText = response.data.ParsedResults?.[0]?.ParsedText || "";

    res.json({ text: parsedText });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "OCR failed" });
  }
}
