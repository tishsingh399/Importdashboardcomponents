import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface PostureScoreProps {
  score: number;
  maxScore: number;
  delta: number;
  categories: { name: string; score: number; max: number; icon: React.ReactNode }[];
}

function getScoreColor(pct: number): string {
  if (pct >= 85) return 'rgb(82,196,26)';
  if (pct >= 70) return 'rgb(250,173,20)';
  return 'rgb(255,77,79)';
}

function DonutChart({ pct, score, delta }: { pct: number; score: number; delta: number }) {
  const R = 54;
  const cx = 70;
  const cy = 70;
  const circumference = 2 * Math.PI * R;
  const strokeDash = (pct / 100) * circumference;
  const color = getScoreColor(pct);
  const isPositive = delta > 0;

  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      {/* Track */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="12"
      />
      {/* Progress arc */}
      <circle
        cx={cx} cy={cy} r={R}
        fill="none"
        stroke={color}
        strokeWidth="12"
        strokeDasharray={`${strokeDash} ${circumference - strokeDash}`}
        strokeDashoffset={circumference / 4}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
      {/* Score text */}
      <text
        x={cx} y={cy - 6}
        textAnchor="middle"
        fill="var(--foreground)"
        fontSize="28"
        fontWeight="600"
        fontFamily="var(--font-sans)"
      >
        {score}
      </text>
      <text
        x={cx} y={cy + 14}
        textAnchor="middle"
        fill="var(--muted-foreground)"
        fontSize="11"
        fontFamily="var(--font-sans)"
      >
        / {100}
      </text>
      {/* Delta badge */}
      <text
        x={cx} y={cy + 30}
        textAnchor="middle"
        fill={isPositive ? 'rgb(82,196,26)' : 'rgb(255,77,79)'}
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-sans)"
      >
        {isPositive ? '▲' : '▼'} {Math.abs(delta)} pts
      </text>
    </svg>
  );
}

export function PostureScore({ score, maxScore, delta, categories }: PostureScoreProps) {
  const pct = Math.round((score / maxScore) * 100);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle
          className="text-muted-foreground"
          style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}
        >
          Security Posture Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-5">
          <DonutChart pct={pct} score={score} delta={delta} />
          <div className="flex-1 space-y-2.5">
            {categories.map((cat) => {
              const catPct = (cat.score / cat.max) * 100;
              const barColor = getScoreColor(catPct);
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      {cat.icon}
                      <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}>
                        {cat.name}
                      </span>
                    </div>
                    <span style={{ fontSize: 'var(--text-label)', color: barColor, fontWeight: '600' }}>
                      {cat.score}/{cat.max}
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full rounded-full"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  >
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${catPct}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
