import ReactDOM from "react-dom/client";
import PositionCalculator from "./PositionCalculator";
import "./index.css";

const root = document.createElement("div");
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);

rootDiv.render(<PositionCalculator />);
