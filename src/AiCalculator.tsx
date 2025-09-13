import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import { useCalculateContext } from "./CalculateContext";
import useBinanceApi from "./hooks/useBinanceApi";
import useAnalyzeWithAi from "./hooks/useAnalyzeWithAi";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

  const handleAnalyze = async () => {
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
    <Card className="border-border/50 shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">AI Market Analysis</CardTitle>
            <CardDescription>
              Get intelligent insights powered by advanced AI algorithms
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="request" className="text-sm font-medium">
            Market Analysis Request
          </Label>
          <Textarea
            id="request"
            placeholder="Enter your market analysis request here... (e.g., 'Analyze BTC/USD trend for the next 24 hours')"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[120px] resize-none bg-input border-border/50 focus:border-primary/50 transition-colors"
          />
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={status === "analyzing" || status === "uploading"}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {status === "analyzing" ? "Analyzing..." : "Analyze with AI"}
        </Button>
        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
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
