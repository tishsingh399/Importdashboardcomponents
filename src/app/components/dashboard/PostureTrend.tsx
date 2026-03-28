import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const weeks = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6'];

const data = {
  secureScore: [62, 68, 71, 76, 80, 85],
  criticalIssues: [89, 78, 72, 58, 42, 23],
  attackPaths: [45, 42, 38, 30, 22, 12],
};

const chartH = 200;
const chartW = 560;
const padL = 48;
const padR = 24;
const padT = 16;
const padB = 36;
const plotW = chartW - padL - padR;
const plotH = chartH - padT - padB;
const maxVal = 100;

function toX(i: number) {
  return padL + (i / (weeks.length - 1)) * plotW;
}
function toY(v: number) {
  return padT + plotH - (v / maxVal) * plotH;
}

interface Series {
  values: number[];
  color: string;
  label: string;
  current: number;
  trend: '+' | '-';
}

const series: Series[] = [
  { values: data.secureScore, color: '#52c41a', label: 'Secure Score', current: 85, trend: '+' },
  { values: data.criticalIssues, color: '#ff4d4f', label: 'Critical Issues', current: 23, trend: '-' },
  { values: data.attackPaths, color: '#faad14', label: 'Attack Paths', current: 12, trend: '-' },
];

function buildPath(values: number[]) {
  return values.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i)},${toY(v)}`).join(' ');
}

function buildArea(values: number[]) {
  const line = buildPath(values);
  return `${line} L${toX(values.length - 1)},${padT + plotH} L${toX(0)},${padT + plotH} Z`;
}

export function PostureTrend() {
  const [hover, setHover] = useState<{ x: number; y: number; values: number[]; weekIdx: number } | null>(null);
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}>
              Security Posture Trend
            </CardTitle>
            <p className="text-muted-foreground mt-0.5" style={{ fontSize: 'var(--text-label)' }}>
              6-week improvement overview
            </p>
          </div>
          <div className="flex items-center gap-5">
            {series.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div
                  className="size-2"
                  style={{ backgroundColor: s.color, borderRadius: '50%', flexShrink: 0 }}
                />
                <span style={{ fontSize: '11px', color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: s.trend === '+' ? s.color : s.color,
                  }}
                >
                  {s.trend}{s.current}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="relative">
          <svg
            viewBox={`0 0 ${chartW} ${chartH}`}
            className="w-full"
            style={{ maxHeight: '220px', overflow: 'visible' }}
            onMouseLeave={() => setHover(null)}
          >
            {/* Grid lines */}
            {gridLines.map((val) => (
              <g key={val}>
                <line
                  x1={padL} y1={toY(val)} x2={chartW - padR} y2={toY(val)}
                  stroke={val === 0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)'}
                  strokeWidth={val === 0 ? '1.5' : '1'}
                  strokeDasharray={val === 0 ? '' : '3,4'}
                />
                <text
                  x={padL - 10} y={toY(val)} dy="4"
                  textAnchor="end"
                  fill="var(--muted-foreground)"
                  style={{ fontSize: '10px' }}
                >
                  {val}
                </text>
              </g>
            ))}

            {/* X labels */}
            {weeks.map((w, i) => (
              <text
                key={w}
                x={toX(i)} y={chartH - 6}
                textAnchor="middle"
                fill="var(--muted-foreground)"
                style={{ fontSize: '11px' }}
              >
                {w}
              </text>
            ))}

            {/* Area fills */}
            {series.map((s) => (
              <path
                key={s.label + '-area'}
                d={buildArea(s.values)}
                fill={s.color}
                opacity="0.07"
              />
            ))}

            {/* Lines */}
            {series.map((s) => (
              <path
                key={s.label + '-line'}
                d={buildPath(s.values)}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {/* Dots */}
            {series.map((s) =>
              s.values.map((v, i) => (
                <circle
                  key={`${s.label}-dot-${i}`}
                  cx={toX(i)} cy={toY(v)} r="3.5"
                  fill="var(--card)"
                  stroke={s.color}
                  strokeWidth="2"
                />
              ))
            )}

            {/* Hover detection zones */}
            {weeks.map((_, i) => (
              <rect
                key={`hover-${i}`}
                x={toX(i) - 30}
                y={padT}
                width={60}
                height={plotH}
                fill="transparent"
                onMouseEnter={() =>
                  setHover({
                    x: toX(i),
                    y: padT,
                    values: series.map((s) => s.values[i]),
                    weekIdx: i,
                  })
                }
              />
            ))}

            {/* Hover tooltip */}
            {hover && (
              <g>
                <line
                  x1={hover.x} y1={padT}
                  x2={hover.x} y2={padT + plotH}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <rect
                  x={hover.x < chartW / 2 ? hover.x + 10 : hover.x - 120}
                  y={padT + 4}
                  width="110"
                  height={series.length * 20 + 24}
                  rx="4"
                  fill="rgba(15,20,35,0.92)"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                <text
                  x={hover.x < chartW / 2 ? hover.x + 18 : hover.x - 112}
                  y={padT + 18}
                  fill="rgba(255,255,255,0.5)"
                  style={{ fontSize: '10px', fontWeight: '600' }}
                >
                  {weeks[hover.weekIdx]}
                </text>
                {series.map((s, si) => (
                  <g key={s.label + '-tooltip'}>
                    <circle
                      cx={hover.x < chartW / 2 ? hover.x + 20 : hover.x - 104}
                      cy={padT + 32 + si * 20}
                      r="3"
                      fill={s.color}
                    />
                    <text
                      x={hover.x < chartW / 2 ? hover.x + 28 : hover.x - 96}
                      y={padT + 36 + si * 20}
                      fill="rgba(255,255,255,0.7)"
                      style={{ fontSize: '10px' }}
                    >
                      {s.label.split(' ')[0]}: {hover.values[si]}
                    </text>
                  </g>
                ))}
              </g>
            )}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
