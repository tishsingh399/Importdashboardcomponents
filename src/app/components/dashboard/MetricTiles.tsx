import { Card, CardContent } from "../ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface MetricTileProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  invertTrend?: boolean;
}

export function MetricTile({ label, value, change, changeLabel, icon, invertTrend = true }: MetricTileProps) {
  const isGood = invertTrend ? (change && change < 0) : (change && change > 0);
  const isBad = invertTrend ? (change && change > 0) : (change && change < 0);

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p 
              className="text-muted-foreground" 
              style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}
            >
              {label}
            </p>
            <p style={{ fontSize: 'var(--text-h2)', fontWeight: 'var(--font-weight-medium)' }}>
              {value}
            </p>
            {change !== undefined && (
              <div 
                className="flex items-center gap-1"
                style={{
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: isGood ? 'rgb(var(--chart-2))' : isBad ? 'rgb(var(--destructive))' : 'rgb(var(--muted-foreground))'
                }}
              >
                {isGood ? <TrendingDown className="size-3" /> : isBad ? <TrendingUp className="size-3" /> : null}
                {change > 0 ? "+" : ""}{change}% {changeLabel || "vs last week"}
              </div>
            )}
          </div>
          <div 
            className="p-2 bg-muted/60 text-muted-foreground"
            style={{ borderRadius: 'var(--radius)' }}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
