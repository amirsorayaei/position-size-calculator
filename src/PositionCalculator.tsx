import { useState } from "react";

interface Result {
  riskAmount: number;
  tokenAmount: number;
  positionSize: number;
  marginRequired: number;
  leverage: number;
}

const PositionCalculator = () => {
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
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "16px auto",
        padding: "16px",
      }}
    >
      <div
        style={{
          padding: "0 16px 16px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          direction: "ltr",
          textAlign: "left",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2
          style={{
            color: "#2c3e50",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Crypto Position Calculator
        </h2>

        <div className="grid-wrapper">
          {/** Position Type */}
          <div>
            <label>Position Type: </label>
            <div style={{ marginTop: "5px" }}>
              <label style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  value="long"
                  checked={positionType === "long"}
                  onChange={() => setPositionType("long")}
                  style={{ marginRight: "5px" }}
                />
                Long
              </label>
              <label>
                <input
                  type="radio"
                  value="short"
                  checked={positionType === "short"}
                  onChange={() => setPositionType("short")}
                  style={{ marginRight: "5px" }}
                />
                Short
              </label>
            </div>
          </div>

          {/** Input Mode Toggle */}
          <div>
            <label>Input Mode: </label>
            <div style={{ marginTop: "5px" }}>
              <label style={{ marginRight: "15px" }}>
                <input
                  type="radio"
                  value="leverage"
                  checked={inputMode === "leverage"}
                  onChange={() => setInputMode("leverage")}
                  style={{ marginRight: "5px" }}
                />
                Leverage
              </label>
              <label>
                <input
                  type="radio"
                  value="margin"
                  checked={inputMode === "margin"}
                  onChange={() => setInputMode("margin")}
                  style={{ marginRight: "5px" }}
                />
                Margin
              </label>
            </div>
          </div>

          {/** Account Balance */}
          <div>
            <label>Account Balance (USDT): </label>
            <input
              type="number"
              value={accountBalance}
              onChange={(e) =>
                setAccountBalance(parseFloat(e.target.value) || 0)
              }
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          {/** Risk Percentage */}
          <div>
            <label>Risk Percentage %: </label>
            <input
              type="number"
              value={riskPercentage}
              onChange={(e) =>
                setRiskPercentage(parseFloat(e.target.value) || 0)
              }
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          {/** Leverage or Margin Input */}
          <div>
            <label>
              {inputMode === "leverage" ? "Leverage: " : "Margin (USDT): "}
            </label>
            <input
              type="number"
              value={inputMode === "leverage" ? leverage : margin}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                if (inputMode === "leverage") {
                  setLeverage(value);
                } else {
                  setMargin(value);
                }
              }}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          {/** Entry Price */}
          <div>
            <label>Entry Price: </label>
            <input
              type="number"
              step="0.00001"
              value={entryPrice}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>

          {/** Stop Loss Price */}
          <div style={{ marginBottom: "20px" }}>
            <label>Stop Loss Price: </label>
            <input
              type="number"
              step="0.00001"
              value={stopLossPrice}
              onChange={(e) =>
                setStopLossPrice(parseFloat(e.target.value) || 0)
              }
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        </div>

        {error && (
          <div
            style={{
              color: "#e74c3c",
              backgroundColor: "#fadbd8",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={calculatePosition}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#2980b9")
          }
          onMouseOut={(e) =>
            ((e.target as HTMLButtonElement).style.backgroundColor = "#3498db")
          }
        >
          Calculate
        </button>

        {result && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              backgroundColor: "white",
              borderRadius: "4px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3
              style={{
                color: "#2c3e50",
                marginTop: 0,
                textAlign: "center",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              Calculation Results
            </h3>
            <p>
              Allowed Loss Amount:{" "}
              <strong>{result.riskAmount.toFixed(2)} USDT</strong>
            </p>
            <p>
              Position Size:{" "}
              <strong>{result.positionSize.toFixed(2)} USDT</strong>
            </p>
            {inputMode === "leverage" ? (
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  padding: "10px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                Required Margin:{" "}
                <strong style={{ color: "#e74c3c" }}>
                  {result.marginRequired.toFixed(2)} USDT
                </strong>
              </p>
            ) : (
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#2c3e50",
                  padding: "10px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                Required Leverage:{" "}
                <strong style={{ color: "#e74c3c" }}>
                  {result.leverage.toFixed(2)}x
                </strong>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionCalculator;
