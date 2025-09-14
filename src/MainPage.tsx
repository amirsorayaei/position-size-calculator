import { TrendingUp } from "lucide-react";

import AiCalculator from "./AiCalculator";
import PositionCalculator from "./PositionCalculator";
import PositionCalculationResult from "./PositionCalculationResult";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-6xl space-y-4 lg:space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 lg:space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2 lg:mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 lg:h-8 lg:w-8 text-primary" />
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              CryptoTrader Pro
            </h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
          <AiCalculator />
          <PositionCalculator />
        </div>

        <div id="position-result">
          <PositionCalculationResult />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
