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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "./hooks/useIsMobile";

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
  const isMobile = useIsMobile();

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
    <Accordion
      type="single"
      collapsible
      className="w-full h-full"
      value={isMobile ? undefined : "item-1"}
    >
      <AccordionItem value="item-1" className="h-full">
        <Card className="border-border/50 shadow-2xl py-0 gap-3 h-full">
          <AccordionTrigger className="items-center pr-4">
            <CardHeader className="w-full pb-0 px-3 lg:px-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-md lg:text-xl">
                    AI Market Analysis
                  </CardTitle>
                  <CardDescription className="text-xs lg:text-md">
                    Get intelligent insights powered by advanced AI
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent className="h-full">
            <CardContent className="space-y-4 px-3 lg:px-6 h-full">
              <div className="space-y-2">
                <Label htmlFor="request" className="text-sm font-medium">
                  Market Analysis Request
                </Label>
                <Textarea
                  id="request"
                  placeholder="Enter your market analysis request here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="text-sm lg:text-md min-h-[250px] resize-none bg-input border-border/50 focus:border-primary/50 transition-colors"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={status === "analyzing" || status === "uploading"}
                className="mt-auto w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
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
