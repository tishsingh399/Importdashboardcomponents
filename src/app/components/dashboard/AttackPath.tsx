import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { RiskBadge } from "./RiskBadge";
import { Globe, Server, KeyRound, Database, ArrowRight, Shield, AlertTriangle } from "lucide-react";

interface PathNode {
  id: string;
  label: string;
  type: "entry" | "compute" | "identity" | "data" | "target";
  detail: string;
}

interface AttackPathProps {
  id: string;
  title: string;
  score: number;
  risk: "critical" | "high" | "medium" | "low";
  nodes: PathNode[];
  breakpoint: string;
  onRemediate?: () => void;
}

const nodeIcons: Record<PathNode["type"], React.ReactNode> = {
  entry: <Globe className="size-4" />,
  compute: <Server className="size-4" />,
  identity: <KeyRound className="size-4" />,
  data: <Database className="size-4" />,
  target: <Database className="size-4" />,
};

const nodeStyles: Record<PathNode["type"], { bg: string; border: string; text: string }> = {
  entry: {
    bg: 'rgba(255,77,79,0.08)',
    border: 'rgba(255,77,79,0.25)',
    text: '#ff4d4f',
  },
  compute: {
    bg: 'rgba(24,144,255,0.08)',
    border: 'rgba(24,144,255,0.25)',
    text: '#1890ff',
  },
  identity: {
    bg: 'rgba(114,46,209,0.08)',
    border: 'rgba(114,46,209,0.25)',
    text: '#722ed1',
  },
  data: {
    bg: 'rgba(250,173,20,0.08)',
    border: 'rgba(250,173,20,0.25)',
    text: '#faad14',
  },
  target: {
    bg: 'rgba(255,77,79,0.12)',
    border: 'rgba(255,77,79,0.4)',
    text: '#ff4d4f',
  },
};

export function AttackPath({ title, score, risk, nodes, breakpoint, onRemediate }: AttackPathProps) {
  const breakpointNode = nodes.find((n) => n.id === breakpoint);

  return (
    <Card className="overflow-hidden" style={{ borderColor: risk === 'critical' ? 'rgba(255,77,79,0.2)' : undefined }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}>
              {title}
            </CardTitle>
            <RiskBadge level={risk} score={score} />
          </div>
          <Button
            size="sm"
            onClick={onRemediate}
            className="gap-1.5"
            style={{
              backgroundColor: risk === 'critical' ? 'rgba(255,77,79,0.1)' : undefined,
              borderColor: risk === 'critical' ? 'rgba(255,77,79,0.3)' : undefined,
              color: risk === 'critical' ? '#ff4d4f' : undefined,
            }}
            variant="outline"
          >
            <Shield className="size-3.5" />
            Break Chain
          </Button>
        </div>
        {breakpointNode && (
          <div
            className="flex items-center gap-2 mt-2 px-3 py-2"
            style={{
              backgroundColor: 'rgba(250,173,20,0.08)',
              border: '1px solid rgba(250,173,20,0.25)',
              borderRadius: 'var(--radius)',
            }}
          >
            <AlertTriangle className="size-3.5" style={{ color: '#faad14', flexShrink: 0 }} />
            <span style={{ fontSize: 'var(--text-label)', color: '#faad14', fontWeight: '500' }}>
              Fix at <strong>{breakpointNode.label}</strong> — {breakpointNode.detail} — breaks this entire chain
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {nodes.map((node, i) => {
            const isBreakpoint = node.id === breakpoint;
            const isTarget = node.type === 'target';
            const nodeStyle = nodeStyles[node.type];
            return (
              <div key={node.id} className="flex items-center gap-1 shrink-0">
                <div
                  className="relative flex flex-col items-center gap-1.5 p-3 text-center min-w-[110px]"
                  style={{
                    backgroundColor: nodeStyle.bg,
                    borderWidth: isBreakpoint ? '2px' : '1px',
                    borderStyle: 'solid',
                    borderColor: isBreakpoint ? '#faad14' : nodeStyle.border,
                    borderRadius: 'var(--radius)',
                    color: nodeStyle.text,
                    boxShadow: isBreakpoint
                      ? '0 0 12px rgba(250,173,20,0.25)'
                      : isTarget
                      ? '0 0 12px rgba(255,77,79,0.2)'
                      : 'none',
                  }}
                >
                  {isBreakpoint && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1"
                      style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        backgroundColor: '#faad14',
                        color: 'rgba(0,0,0,0.85)',
                        padding: '2px 7px',
                        borderRadius: '99px',
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                      }}
                    >
                      ⚡ Fix here
                    </span>
                  )}
                  {isTarget && (
                    <span
                      className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                      style={{
                        fontSize: '9px',
                        fontWeight: '700',
                        backgroundColor: '#ff4d4f',
                        color: 'white',
                        padding: '2px 7px',
                        borderRadius: '99px',
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Target
                    </span>
                  )}
                  <div className="flex items-center gap-1.5 mt-1">
                    {nodeIcons[node.type]}
                    <span style={{ fontSize: '12px', fontWeight: '600' }}>
                      {node.label}
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', opacity: 0.75, lineHeight: 1.3, color: 'var(--muted-foreground)' }}>
                    {node.detail}
                  </span>
                </div>
                {i < nodes.length - 1 && (
                  <ArrowRight
                    className="size-4 shrink-0"
                    style={{
                      color: i === nodes.findIndex((n) => n.id === breakpoint) - 1
                        ? 'rgba(250,173,20,0.5)'
                        : 'rgba(255,255,255,0.15)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
