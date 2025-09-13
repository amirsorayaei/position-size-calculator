import type { NextApiRequest, NextApiResponse } from "next";

type AnalyzeRequestBody = {
  imageDataUrl?: string;
};

type AnalyzeSuccess = {
  result: string;
};

type AnalyzeError = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AnalyzeSuccess | AnalyzeError>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
  }

  try {
    const body: AnalyzeRequestBody = req.body || {};
    const { imageDataUrl } = body;

    if (!imageDataUrl || typeof imageDataUrl !== "string") {
      return res.status(400).json({ error: "imageDataUrl is required" });
    }

    const systemPrompt =
      "You are a precise computer vision assistant. Given an image, extract concise, actionable insights relevant to trading or chart patterns if present; otherwise summarize the most important contents. Keep it under 120 words.";

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: systemPrompt,
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "Analyze this image and respond with a short, clear answer.",
              },
              {
                type: "input_image",
                image_url: {
                  url: imageDataUrl,
                },
              },
            ],
          },
        ],
        max_output_tokens: 400,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: `OpenAI error: ${errorText}` });
    }

    const data = (await response.json()) as any;
    // New Responses API returns an array in output[0].content[0].text for text outputs
    let resultText = "";
    try {
      resultText = data.output?.[0]?.content?.[0]?.text ?? "";
    } catch {
      resultText = "";
    }

    if (!resultText) {
      return res.status(500).json({ error: "No text result from model" });
    }

    return res.status(200).json({ result: resultText });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Unexpected error" });
  }
}
