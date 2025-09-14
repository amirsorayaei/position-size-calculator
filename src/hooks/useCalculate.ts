import { useEffect, useState } from "react";

interface Result {
  riskAmount: number;
  tokenAmount: number;
  positionSize: number;
  marginRequired: number;
  leverage: number;
}

export const useCalculate = () => {
  const [text, setText] = useState<string>("");
  const [accountBalance, setAccountBalance] = useState<number>(100);
  const [riskPercentage, setRiskPercentage] = useState<number>(5);
  const [entryPrice, setEntryPrice] = useState<number>(0);
  const [stopLossPrice, setStopLossPrice] = useState<number>(0);
  const [leverage, setLeverage] = useState<number>(10);
  const [margin, setMargin] = useState<number>(0);
  const [inputMode, setInputMode] = useState<"leverage" | "margin">("leverage");
  const [positionType, setPositionType] = useState<"long" | "short">("long");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const calculatePosition = () => {
    // Clear previous errors
    setError("");

    // Validate input data
    if (accountBalance <= 0) {
      setError("Account balance must be greater than zero");
      return;
    }

    if (riskPercentage <= 0 || riskPercentage > 100) {
      setError("Risk percentage must be between 0 and 100");
      return;
    }

    if (entryPrice <= 0 || stopLossPrice <= 0) {
      setError("Prices must be greater than zero");
      return;
    }

    // Check logical stop loss relative to position type
    if (positionType === "long" && stopLossPrice >= entryPrice) {
      setError("For long position, stop loss must be below entry price");
      return;
    }

    if (positionType === "short" && stopLossPrice <= entryPrice) {
      setError("For short position, stop loss must be above entry price");
      return;
    }

    // Calculate allowed loss amount
    const riskAmount = accountBalance * (riskPercentage / 100);

    // Calculate price difference (always positive)
    const priceDifference = Math.abs(entryPrice - stopLossPrice);

    // Calculate position size for leveraged trading
    // Position size = (Risk amount * Entry price) / Price difference
    const positionSize = (riskAmount * entryPrice) / priceDifference;

    // Calculate number of tokens
    const tokenAmount = positionSize / entryPrice;

    let calculatedLeverage: number;
    let marginRequired: number;

    if (inputMode === "leverage") {
      // Validate leverage input
      if (leverage <= 0) {
        setError("Leverage must be greater than zero");
        return;
      }
      calculatedLeverage = leverage;
      marginRequired = positionSize / leverage;
    } else {
      // Validate margin input
      if (margin <= 0) {
        setError("Margin must be greater than zero");
        return;
      }
      if (margin > accountBalance) {
        setError("Margin cannot exceed account balance");
        return;
      }
      marginRequired = margin;
      calculatedLeverage = positionSize / margin;
    }

    setResult({
      riskAmount,
      tokenAmount,
      positionSize,
      marginRequired,
      leverage: calculatedLeverage,
    });

    setTimeout(() => {
      const resultElement = window.document.getElementById("position-result");
      resultElement?.scrollIntoView({ behavior: "smooth", inline: "end" });
    }, 100);
  };

  const resetPosition = () => {
    setText("");
    setAccountBalance(100);
    setRiskPercentage(5);
    setEntryPrice(0);
    setStopLossPrice(0);
    setLeverage(10);
    setMargin(0);
    setError("");
    setResult(null);
  };

  return {
    accountBalance,
    setAccountBalance,
    riskPercentage,
    setRiskPercentage,
    entryPrice,
    setEntryPrice,
    stopLossPrice,
    setStopLossPrice,
    inputMode,
    setInputMode,
    leverage,
    setLeverage,
    margin,
    setMargin,
    positionType,
    setPositionType,
    result,
    error,
    calculatePosition,
    resetPosition,
    text,
    setText,
  };
};
