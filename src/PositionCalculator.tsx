import { useCalculateContext } from "./CalculateContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Calculator, DollarSign, Target } from "lucide-react";

const PositionCalculator = () => {
  const {
    accountBalance,
    calculatePosition,
    resetPosition,
    inputMode,
    leverage,
    margin,
    setLeverage,
    setMargin,
    entryPrice,
    error,
    positionType,
    riskPercentage,
    setAccountBalance,
    setEntryPrice,
    setInputMode,
    setPositionType,
    setRiskPercentage,
    setStopLossPrice,
    stopLossPrice,
  } = useCalculateContext();

  return (
    <Card className="border-border/50 shadow-2xl py-3 lg:py-6 gap-3">
      <CardHeader className="pb-0 lg:pb-4 px-3 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-chart-1/10">
            <Calculator className="h-5 w-5 text-chart-1" />
          </div>
          <div>
            <CardTitle className="text-md lg:text-xl">
              Position Calculator
            </CardTitle>
            <CardDescription className="text-xs lg:text-md">
              Calculate optimal position sizes and risk management
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-3 lg:px-6">
        <div className="flex flex-row gap-6">
          {/* Position Type */}
          <div className="flex-1 space-y-3">
            <Label className="text-sm font-medium">Position Type</Label>
            <RadioGroup
              value={positionType}
              onValueChange={(value: "long" | "short") =>
                setPositionType(value)
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="long"
                  id="long"
                  className="border-primary text-primary"
                />
                <Label htmlFor="long" className="text-sm cursor-pointer">
                  Long
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="short"
                  id="short"
                  className="border-primary text-primary"
                />
                <Label htmlFor="short" className="text-sm cursor-pointer">
                  Short
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Input Mode */}
          <div className="flex-1 space-y-3">
            <Label className="text-sm font-medium">Input Mode</Label>
            <RadioGroup
              value={inputMode}
              onValueChange={(value: "leverage" | "margin") =>
                setInputMode(value)
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="leverage"
                  id="leverage"
                  className="border-primary text-primary"
                />
                <Label htmlFor="leverage" className="text-sm cursor-pointer">
                  Leverage
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="margin"
                  id="margin"
                  className="border-primary text-primary"
                />
                <Label htmlFor="margin" className="text-sm cursor-pointer">
                  Margin
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Input Fields Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="balance"
              className="text-sm font-medium flex items-center gap-1"
            >
              <DollarSign className="h-3 w-3" />
              Account Balance (USDT)
            </Label>
            <Input
              id="balance"
              type="number"
              value={accountBalance}
              onChange={(e) => setAccountBalance(Number(e.target.value))}
              className="bg-input border-border/50 focus:border-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="risk"
              className="text-sm font-medium flex items-center gap-1"
            >
              <Target className="h-3 w-3" />
              Risk Percentage %
            </Label>
            <Input
              id="risk"
              type="number"
              value={riskPercentage}
              onChange={(e) => setRiskPercentage(Number(e.target.value))}
              className="bg-input border-border/50 focus:border-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="leverage-input" className="text-sm font-medium">
              {inputMode === "leverage" ? "Leverage: " : "Margin (USDT): "}
            </Label>
            <Input
              id="leverage-input"
              type="number"
              value={inputMode === "leverage" ? leverage : margin}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (inputMode === "leverage") {
                  setLeverage(value);
                } else {
                  setMargin(value);
                }
              }}
              className="bg-input border-border/50 focus:border-primary/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="entry" className="text-sm font-medium">
              Entry Price
            </Label>
            <Input
              id="entry"
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              className="bg-input border-border/50 focus:border-primary/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stop-loss" className="text-sm font-medium">
            Stop Loss Price
          </Label>
          <Input
            id="stop-loss"
            type="number"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(Number(e.target.value))}
            className="bg-input border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={resetPosition}
            className="flex-1 border-border/50 hover:bg-secondary/50 bg-transparent"
          >
            Reset
          </Button>
          <Button
            onClick={calculatePosition}
            className="flex-1 bg-chart-1 hover:bg-chart-1/90 text-white font-medium"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Calculate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionCalculator;
