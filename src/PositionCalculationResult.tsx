import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  DollarSign,
  Target,
  Shield,
  BarChart3,
  TrendingDown,
} from "lucide-react";
import { useCalculateContext } from "./CalculateContext";

const PositionCalculationResult = () => {
  const { result } = useCalculateContext();

  return (
    <Card className="border-border/50 shadow-2xl bg-gradient-to-br from-card to-card/50 py-3 lg:py-6 gap-3">
      <CardHeader className="pb-0 lg:pb-4 px-3 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-chart-2/10">
            <BarChart3 className="h-5 w-5 text-chart-2" />
          </div>
          <div>
            <CardTitle className="text-md lg:text-xl flex items-center gap-2">
              Calculation Results
              <Badge
                variant="secondary"
                className="bg-chart-2/10 text-chart-2 border-chart-2/20"
              >
                <TrendingUp className="h-3 w-3 mr-1" />
                Calculated
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs lg:text-md">
              Your optimized position parameters based on risk management
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-3 lg:px-6">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-destructive" />
              <Label className="text-sm font-medium text-destructive">
                Allowed Loss
              </Label>
            </div>
            <div className="text-2xl font-bold text-destructive">
              {Boolean(result?.riskAmount)
                ? `$${Number(result?.riskAmount).toFixed(2)}`
                : "----"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Maximum risk exposure
            </p>
          </div>

          <div className="p-4 rounded-lg bg-chart-1/5 border border-chart-1/20">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-chart-1" />
              <Label className="text-sm font-medium text-chart-1">
                Position Size
              </Label>
            </div>
            <div className="text-2xl font-bold text-chart-1">
              {Boolean(result?.positionSize)
                ? `$${Number(result?.positionSize).toFixed(2)}`
                : "----"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total position value
            </p>
          </div>

          <div className="p-4 rounded-lg bg-chart-3/5 border border-chart-3/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-chart-3" />
              <Label className="text-sm font-medium text-chart-3">
                Required Margin
              </Label>
            </div>
            <div className="text-2xl font-bold text-chart-3">
              {Boolean(result?.marginRequired)
                ? `$${Number(result?.marginRequired).toFixed(2)}`
                : "----"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Margin requirement
            </p>
          </div>

          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium text-primary">
                Required Leverage
              </Label>
            </div>
            <div className="text-2xl font-bold text-primary">
              {Boolean(result?.leverage) ? `${result?.leverage}X` : "----"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Optimal leverage ratio
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionCalculationResult;
