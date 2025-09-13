import styles from "@/styles/Home.module.scss";
import { useCalculateContext } from "./CalculateContext";

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
    result,
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
    <div
      style={{
        maxWidth: "500px",
        margin: "16px auto",
        padding: "16px",
      }}
    >
      <div className={styles.main}>
        <h2
          style={{
            color: "#2c3e50",
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Crypto Position Calculator
        </h2>

        <div className={styles.gridWrapper}>
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
              onChange={(e) => setAccountBalance(parseFloat(e.target.value))}
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
              onChange={(e) => setRiskPercentage(parseFloat(e.target.value))}
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
                const value = parseFloat(e.target.value);
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
              value={entryPrice}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
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
          <div className={styles.gridFill} style={{ marginBottom: "20px" }}>
            <label>Stop Loss Price: </label>
            <input
              type="number"
              value={stopLossPrice}
              onChange={(e) => setStopLossPrice(parseFloat(e.target.value))}
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

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={resetPosition}
            style={{
              width: "100%",
              padding: "12px",
              // backgroundColor: "#3498db",
              color: "#3498db",
              border: "1px solid #3498db",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "background-color 0.3s",
            }}
          >
            Reset
          </button>
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
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#2980b9")
            }
            onMouseOut={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#3498db")
            }
          >
            Calculate
          </button>
        </div>

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
