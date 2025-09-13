import { useEffect, useState } from "react";
import { useCalculateContext } from "./CalculateContext";
import useBinanceApi from "./hooks/useBinanceApi";
import useAnalyzeWithAi from "./hooks/useAnalyzeWithAi";

type AnalysisState = "idle" | "uploading" | "analyzing" | "done" | "error";

const AiCalculator = () => {
  const {
    text,
    setText,
    setLeverage,
    setEntryPrice,
    setStopLossPrice,
    calculatePosition,
  } = useCalculateContext();
  const { getBinanceMarketPrice } = useBinanceApi();
  const { analyzeWithAi } = useAnalyzeWithAi();
  const [status, setStatus] = useState<AnalysisState>("idle");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (status === "done") {
      setTimeout(() => {
        calculatePosition();
        setStatus("idle");
      }, 500);
    }
  }, [status]);

  const analyzeImage = async () => {
    setStatus("analyzing");
    setError("");

    try {
      const analyzedData = await analyzeWithAi(text);
      if (analyzedData.entry_point === "market") {
        const symbol = analyzedData?.symbol_pair?.replace("_", "");

        if (!symbol) throw new Error("No Symbol Found!");

        const marketPrice = await getBinanceMarketPrice(symbol);
        setEntryPrice(marketPrice ? +marketPrice.price : 0);
      } else {
        setEntryPrice(+analyzedData.entry_point);
      }
      setLeverage(analyzedData.leverage);
      setStopLossPrice(analyzedData.stop_loss);
      setStatus("done");
    } catch (err: unknown) {
      setStatus("error");
      setError(getErrorMessage(err, "Failed to analyze"));
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "16px auto",
        padding: "16px",
      }}
    >
      <div>
        <label>Request: </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "100%",
            minWidth: "100%",
            maxHeight: "300px",
            minHeight: "200px",
            padding: "8px",
            marginTop: "5px",
            boxSizing: "border-box",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        />

        <button
          onClick={analyzeImage}
          disabled={status === "analyzing" || status === "uploading"}
          style={{
            width: "100%",
            padding: "8px 12px",
            borderRadius: 6,
            border: "1px solid #111827",
            background: "#111827",
            color: "white",
            cursor:
              status === "analyzing" || status === "uploading"
                ? "not-allowed"
                : "pointer",
          }}
        >
          {status === "analyzing" ? "Analyzing..." : "Analyze with AI"}
        </button>
      </div>

      {error ? <div style={{ color: "#b91c1c" }}>{error}</div> : null}
    </div>
  );
};

export default AiCalculator;

function hasMessage(e: unknown): e is { message: string } {
  return (
    typeof e === "object" &&
    e !== null &&
    "message" in e &&
    typeof (e as { message: unknown }).message === "string"
  );
}

function getErrorMessage(err: unknown, fallback: string): string {
  if (hasMessage(err)) return err.message;
  if (typeof err === "string" && err.trim().length > 0) return err;
  return fallback;
}
