import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

interface PostureScoreProps {
  score: number;
  maxScore: number;
  delta: number;
  categories: { name: string; score: number; max: number; icon: React.ReactNode }[];
}

export function PostureScore({ score, maxScore, delta, categories }: PostureScoreProps) {
  const pct = Math.round((score / maxScore) * 100);
  const isPositive = delta > 0;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle 
          className="text-muted-foreground" 
          style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}
        >
          Security Posture Score
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3 mb-4">
          <span style={{ fontSize: '48px', fontWeight: 'var(--font-weight-medium)' }}>{score}</span>
          <span 
            className="text-muted-foreground mb-1" 
            style={{ fontSize: 'var(--text-subtitle)' }}
          >
            / {maxScore}
          </span>
          <span 
            className="mb-1.5 px-2 py-0.5"
            style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)',
              backgroundColor: isPositive ? 'rgba(var(--chart-2), 0.15)' : 'rgba(var(--destructive), 0.15)',
              color: isPositive ? 'rgb(var(--chart-2))' : 'rgb(var(--destructive))',
              borderRadius: 'var(--radius)'
            }}
          >
            {isPositive ? "+" : ""}{delta} pts this week
          </span>
        </div>
        <Progress value={pct} className="h-2 mb-6" />
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              className="flex items-center gap-2.5 p-2.5 bg-muted/40"
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className="text-muted-foreground">{cat.icon}</div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }} className="truncate">
                  {cat.name}
                </div>
                <div className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                  {cat.score}/{cat.max}
                </div>
              </div>
              <Progress value={(cat.score / cat.max) * 100} className="h-1.5 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
