import vision from "@google-cloud/vision";

export default async function imageToText(req, res) {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }
    const client = new vision.ImageAnnotatorClient({
      keyFilename: "./service-account.json"
    });
    const [result] = await client.textDetection({
      image: { content: image }
    });

    const text = result.fullTextAnnotation?.text || "";

    res.json({ text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OCR failed" });
  }
}
