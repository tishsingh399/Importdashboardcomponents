import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'];

const data = {
  secureScore: [62, 68, 71, 76, 80, 85],
  criticalIssues: [89, 78, 72, 58, 42, 23],
  attackPaths: [45, 42, 38, 30, 22, 12],
};

const maxVal = 100;
const chartH = 200;
const chartW = 560;
const padL = 45;
const padR = 20;
const padT = 10;
const padB = 30;
const plotW = chartW - padL - padR;
const plotH = chartH - padT - padB;

function toX(i: number) {
  return padL + (i / (weeks.length - 1)) * plotW;
}
function toY(v: number) {
  return padT + plotH - (v / maxVal) * plotH;
}

function polyline(values: number[], color: string) {
  const points = values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaPoints = points + ` ${toX(values.length - 1)},${toY(0)} ${toX(0)},${toY(0)}`;
  return (
    <g>
      <polygon points={areaPoints} fill={color} opacity="0.06" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {values.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r="3.5" fill="white" stroke={color} strokeWidth="2" />
      ))}
    </g>
  );
}

export function PostureTrend() {
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle
            className="text-muted-foreground"
            style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}
          >
            Security Posture Trend (6 Weeks)
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="size-2.5" style={{ backgroundColor: 'rgba(82,196,26)', borderRadius: '50%' }} />
              <span className="text-muted-foreground" style={{ fontSize: '11px' }}>Secure Score</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5" style={{ backgroundColor: 'rgba(255,77,79)', borderRadius: '50%' }} />
              <span className="text-muted-foreground" style={{ fontSize: '11px' }}>Critical Issues</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-2.5" style={{ backgroundColor: 'rgba(250,173,20)', borderRadius: '50%' }} />
              <span className="text-muted-foreground" style={{ fontSize: '11px' }}>Attack Paths</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" style={{ maxHeight: '260px' }}>
          {/* Grid */}
          {gridLines.map((val) => (
            <g key={val}>
              <line
                x1={padL} y1={toY(val)} x2={chartW - padR} y2={toY(val)}
                stroke="var(--border)" strokeWidth="1" strokeDasharray={val === 0 ? '' : '3,3'}
              />
              <text
                x={padL - 8} y={toY(val)} dy="4"
                textAnchor="end"
                fill="var(--muted-foreground)"
                style={{ fontSize: '10px' }}
              >
                {val}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {weeks.map((w, i) => (
            <text
              key={w}
              x={toX(i)} y={chartH - 5}
              textAnchor="middle"
              fill="var(--muted-foreground)"
              style={{ fontSize: '10px' }}
            >
              {w}
            </text>
          ))}

          {/* Data lines */}
          {polyline(data.attackPaths, 'rgba(250,173,20)')}
          {polyline(data.criticalIssues, 'rgba(255,77,79)')}
          {polyline(data.secureScore, 'rgba(82,196,26)')}
        </svg>
      </CardContent>
    </Card>
  );
}
