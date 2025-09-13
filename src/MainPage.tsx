import { Badge } from "@/components/ui/badge";
import { TrendingUp, Sparkles, Shield } from "lucide-react";

import AiCalculator from "./AiCalculator";
import PositionCalculator from "./PositionCalculator";
import PositionCalculationResult from "./PositionCalculationResult";
import { useCalculateContext } from "./CalculateContext";

const MainPage = () => {
  const { result } = useCalculateContext();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              CryptoTrader Pro
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced AI-powered crypto trading analysis and position calculator
            for professional traders
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20"
            >
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
            <Badge
              variant="secondary"
              className="bg-chart-4/10 text-chart-4 border-chart-4/20"
            >
              <Shield className="h-3 w-3 mr-1" />
              Risk Management
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <AiCalculator />
          <PositionCalculator />
        </div>

        {result && <PositionCalculationResult />}

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm">
          <p>
            Built with advanced AI algorithms for professional crypto trading
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
