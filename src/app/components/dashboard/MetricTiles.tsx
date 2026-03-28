import { Card, CardContent } from "../ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface SparklineProps {
  data: number[];
  color: string;
}

function Sparkline({ data, color }: SparklineProps) {
  const w = 64;
  const h = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const toX = (i: number) => (i / (data.length - 1)) * w;
  const toY = (v: number) => h - ((v - min) / range) * (h - 4) - 2;
  const points = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaPoints = `${points} ${toX(data.length - 1)},${h} ${toX(0)},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <polygon points={areaPoints} fill={color} opacity="0.15" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={toX(data.length - 1)}
        cy={toY(data[data.length - 1])}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

interface MetricTileProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  invertTrend?: boolean;
  sparkData?: number[];
}

export function MetricTile({
  label,
  value,
  change,
  changeLabel,
  icon,
  invertTrend = true,
  sparkData,
}: MetricTileProps) {
  const isGood = invertTrend ? (change !== undefined && change < 0) : (change !== undefined && change > 0);
  const isBad = invertTrend ? (change !== undefined && change > 0) : (change !== undefined && change < 0);
  const trendColor = isGood
    ? 'rgb(82,196,26)'
    : isBad
    ? 'rgb(255,77,79)'
    : 'rgb(var(--muted-foreground))';

  return (
    <Card>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-start justify-between mb-3">
          <p
            className="text-muted-foreground"
            style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}
          >
            {label}
          </p>
          <div
            className="p-2 text-muted-foreground"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)' }}
          >
            {icon}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <p style={{ fontSize: '28px', fontWeight: '600', lineHeight: 1 }}>
              {value}
            </p>
            {change !== undefined && (
              <div
                className="flex items-center gap-1"
                style={{
                  fontSize: 'var(--text-label)',
                  fontWeight: '600',
                  color: trendColor,
                }}
              >
                {isGood && invertTrend && <TrendingDown className="size-3" />}
                {isBad && invertTrend && <TrendingUp className="size-3" />}
                {isGood && !invertTrend && <TrendingUp className="size-3" />}
                {isBad && !invertTrend && <TrendingDown className="size-3" />}
                <span>
                  {change > 0 ? "+" : ""}{change}%{" "}
                  <span style={{ color: 'var(--muted-foreground)', fontWeight: 'var(--font-weight-normal)' }}>
                    {changeLabel || "vs last week"}
                  </span>
                </span>
              </div>
            )}
          </div>
          {sparkData && (
            <Sparkline
              data={sparkData}
              color={isGood ? 'rgb(82,196,26)' : isBad ? 'rgb(255,77,79)' : 'rgb(24,144,255)'}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
