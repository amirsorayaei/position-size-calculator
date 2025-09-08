import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PositionCalculator from "./PositionCalculator";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PositionCalculator />
  </React.StrictMode>
);
