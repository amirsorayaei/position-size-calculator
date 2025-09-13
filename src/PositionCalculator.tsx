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
    <Card className="border-border/50 shadow-2xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-chart-1/10">
            <Calculator className="h-5 w-5 text-chart-1" />
          </div>
          <div>
            <CardTitle className="text-xl">Position Calculator</CardTitle>
            <CardDescription>
              Calculate optimal position sizes and risk management
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
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
    // <div
    //   style={{
    //     maxWidth: "500px",
    //     margin: "16px auto",
    //     padding: "16px",
    //   }}
    // >
    //   <div className={styles.main}>
    //     <h2
    //       style={{
    //         color: "#2c3e50",
    //         textAlign: "center",
    //         marginBottom: "25px",
    //       }}
    //     >
    //       Crypto Position Calculator
    //     </h2>

    //     <div className={styles.gridWrapper}>
    //       {/** Position Type */}
    //       <div>
    //         <label>Position Type: </label>
    //         <div style={{ marginTop: "5px" }}>
    //           <label style={{ marginRight: "15px" }}>
    //             <input
    //               type="radio"
    //               value="long"
    //               checked={positionType === "long"}
    //               onChange={() => setPositionType("long")}
    //               style={{ marginRight: "5px" }}
    //             />
    //             Long
    //           </label>
    //           <label>
    //             <input
    //               type="radio"
    //               value="short"
    //               checked={positionType === "short"}
    //               onChange={() => setPositionType("short")}
    //               style={{ marginRight: "5px" }}
    //             />
    //             Short
    //           </label>
    //         </div>
    //       </div>

    //       {/** Input Mode Toggle */}
    //       <div>
    //         <label>Input Mode: </label>
    //         <div style={{ marginTop: "5px" }}>
    //           <label style={{ marginRight: "15px" }}>
    //             <input
    //               type="radio"
    //               value="leverage"
    //               checked={inputMode === "leverage"}
    //               onChange={() => setInputMode("leverage")}
    //               style={{ marginRight: "5px" }}
    //             />
    //             Leverage
    //           </label>
    //           <label>
    //             <input
    //               type="radio"
    //               value="margin"
    //               checked={inputMode === "margin"}
    //               onChange={() => setInputMode("margin")}
    //               style={{ marginRight: "5px" }}
    //             />
    //             Margin
    //           </label>
    //         </div>
    //       </div>

    //       {/** Account Balance */}
    //       <div>
    //         <label>Account Balance (USDT): </label>
    //         <input
    //           type="number"
    //           value={accountBalance}
    //           onChange={(e) => setAccountBalance(parseFloat(e.target.value))}
    //           style={{
    //             width: "100%",
    //             padding: "8px",
    //             marginTop: "5px",
    //             boxSizing: "border-box",
    //             border: "1px solid #ccc",
    //             borderRadius: "4px",
    //           }}
    //         />
    //       </div>

    //       {/** Risk Percentage */}
    //       <div>
    //         <label>Risk Percentage %: </label>
    //         <input
    //           type="number"
    //           value={riskPercentage}
    //           onChange={(e) => setRiskPercentage(parseFloat(e.target.value))}
    //           style={{
    //             width: "100%",
    //             padding: "8px",
    //             marginTop: "5px",
    //             boxSizing: "border-box",
    //             border: "1px solid #ccc",
    //             borderRadius: "4px",
    //           }}
    //         />
    //       </div>

    //       {/** Leverage or Margin Input */}
    //       <div>
    //         <label>
    //           {inputMode === "leverage" ? "Leverage: " : "Margin (USDT): "}
    //         </label>
    //         <input
    //           type="number"
    //           value={inputMode === "leverage" ? leverage : margin}
    //           onChange={(e) => {
    //             const value = parseFloat(e.target.value);
    //             if (inputMode === "leverage") {
    //               setLeverage(value);
    //             } else {
    //               setMargin(value);
    //             }
    //           }}
    //           style={{
    //             width: "100%",
    //             padding: "8px",
    //             marginTop: "5px",
    //             boxSizing: "border-box",
    //             border: "1px solid #ccc",
    //             borderRadius: "4px",
    //           }}
    //         />
    //       </div>

    //       {/** Entry Price */}
    //       <div>
    //         <label>Entry Price: </label>
    //         <input
    //           type="number"
    //           value={entryPrice}
    //           onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
    //           style={{
    //             width: "100%",
    //             padding: "8px",
    //             marginTop: "5px",
    //             boxSizing: "border-box",
    //             border: "1px solid #ccc",
    //             borderRadius: "4px",
    //           }}
    //         />
    //       </div>

    //       {/** Stop Loss Price */}
    //       <div className={styles.gridFill} style={{ marginBottom: "20px" }}>
    //         <label>Stop Loss Price: </label>
    //         <input
    //           type="number"
    //           value={stopLossPrice}
    //           onChange={(e) => setStopLossPrice(parseFloat(e.target.value))}
    //           style={{
    //             width: "100%",
    //             padding: "8px",
    //             marginTop: "5px",
    //             boxSizing: "border-box",
    //             border: "1px solid #ccc",
    //             borderRadius: "4px",
    //           }}
    //         />
    //       </div>
    //     </div>

    //     {error && (
    //       <div
    //         style={{
    //           color: "#e74c3c",
    //           backgroundColor: "#fadbd8",
    //           padding: "10px",
    //           borderRadius: "4px",
    //           marginBottom: "15px",
    //           textAlign: "center",
    //         }}
    //       >
    //         {error}
    //       </div>
    //     )}

    //     <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    //       <button
    //         onClick={resetPosition}
    //         style={{
    //           width: "100%",
    //           padding: "12px",
    //           // backgroundColor: "#3498db",
    //           color: "#3498db",
    //           border: "1px solid #3498db",
    //           borderRadius: "4px",
    //           cursor: "pointer",
    //           fontSize: "16px",
    //           fontWeight: "bold",
    //           transition: "background-color 0.3s",
    //         }}
    //       >
    //         Reset
    //       </button>
    //       <button
    //         onClick={calculatePosition}
    //         style={{
    //           width: "100%",
    //           padding: "12px",
    //           backgroundColor: "#3498db",
    //           color: "white",
    //           border: "none",
    //           borderRadius: "4px",
    //           cursor: "pointer",
    //           fontSize: "16px",
    //           fontWeight: "bold",
    //           transition: "background-color 0.3s",
    //         }}
    //         onMouseOver={(e) =>
    //           ((e.target as HTMLButtonElement).style.backgroundColor =
    //             "#2980b9")
    //         }
    //         onMouseOut={(e) =>
    //           ((e.target as HTMLButtonElement).style.backgroundColor =
    //             "#3498db")
    //         }
    //       >
    //         Calculate
    //       </button>
    //     </div>

    //     {result && (
    //       <div
    //         style={{
    //           marginTop: "20px",
    //           padding: "15px",
    //           backgroundColor: "white",
    //           borderRadius: "4px",
    //           border: "1px solid #ddd",
    //           boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    //         }}
    //       >
    //         <h3
    //           style={{
    //             color: "#2c3e50",
    //             marginTop: 0,
    //             textAlign: "center",
    //             borderBottom: "1px solid #eee",
    //             paddingBottom: "10px",
    //           }}
    //         >
    //           Calculation Results
    //         </h3>
    //         <p>
    //           Allowed Loss Amount:{" "}
    //           <strong>{result.riskAmount.toFixed(2)} USDT</strong>
    //         </p>
    //         <p>
    //           Position Size:{" "}
    //           <strong>{result.positionSize.toFixed(2)} USDT</strong>
    //         </p>
    //         {inputMode === "leverage" ? (
    //           <p
    //             style={{
    //               fontSize: "18px",
    //               fontWeight: "bold",
    //               color: "#2c3e50",
    //               padding: "10px",
    //               backgroundColor: "#f8f9fa",
    //               borderRadius: "4px",
    //               textAlign: "center",
    //             }}
    //           >
    //             Required Margin:{" "}
    //             <strong style={{ color: "#e74c3c" }}>
    //               {result.marginRequired.toFixed(2)} USDT
    //             </strong>
    //           </p>
    //         ) : (
    //           <p
    //             style={{
    //               fontSize: "18px",
    //               fontWeight: "bold",
    //               color: "#2c3e50",
    //               padding: "10px",
    //               backgroundColor: "#f8f9fa",
    //               borderRadius: "4px",
    //               textAlign: "center",
    //             }}
    //           >
    //             Required Leverage:{" "}
    //             <strong style={{ color: "#e74c3c" }}>
    //               {result.leverage.toFixed(2)}x
    //             </strong>
    //           </p>
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default PositionCalculator;
