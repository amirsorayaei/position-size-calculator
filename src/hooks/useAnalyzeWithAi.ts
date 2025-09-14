import { IOpenAiResult } from "../types/types";

const useAnalyzeWithAi = () => {
  /**
   *
   * @returns {Promise<IOpenAiResult>}
   */
  const analyzeWithAi = async (text: string): Promise<IOpenAiResult> => {
    const payload = {
      messages: [
        {
          role: "system",
          content:
            "You are a trading analysis assistant. You must respond ONLY with valid JSON objects containing the keys 'leverage', 'stop_loss', 'symbol_pair' and 'entry_point'. Do not include any other text, explanations, or formatting outside the JSON structure. Your response must be parseable by JSON.parse().",
        },
        {
          role: "user",
          content: `Analyze this trade setup and provide ONLY a JSON object with these exact keys: leverage (as a number), stop_loss (as a number), symbol_pair (as a string, like btc_usdt in this format), entry_point (as a string). The input is: ${text}. Only give me the flat json format as result so I can find the keys like leverage: value, stop_loss: value, entry_point: value. I need to json.stringify the json response so don't put any other strings on it. only the json value`,
        },
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: { type: "json_object" },
    };

    try {
      const res = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Unexpected error");
      }

      const assistant_reply = data?.choices?.[0]?.message?.content;
      const value: IOpenAiResult = JSON.parse(assistant_reply);
      return value;
    } catch (err: unknown) {
      throw new Error(err instanceof Error ? err.message : String(err));
    }
  };

  return { analyzeWithAi };
};

export default useAnalyzeWithAi;
