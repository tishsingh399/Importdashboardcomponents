import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { RiskBadge } from "./RiskBadge";
import { Globe, Server, KeyRound, Database, ArrowRight, Shield } from "lucide-react";

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
    bg: 'rgba(var(--destructive), 0.1)', 
    border: 'rgba(var(--destructive), 0.3)', 
    text: 'rgb(var(--destructive))' 
  },
  compute: { 
    bg: 'rgba(var(--chart-1), 0.1)', 
    border: 'rgba(var(--chart-1), 0.3)', 
    text: 'rgb(var(--chart-1))' 
  },
  identity: { 
    bg: 'rgba(var(--chart-5), 0.1)', 
    border: 'rgba(var(--chart-5), 0.3)', 
    text: 'rgb(var(--chart-5))' 
  },
  data: { 
    bg: 'rgba(var(--chart-3), 0.1)', 
    border: 'rgba(var(--chart-3), 0.3)', 
    text: 'rgb(var(--chart-3))' 
  },
  target: { 
    bg: 'rgba(var(--destructive), 0.15)', 
    border: 'rgba(var(--destructive), 0.4)', 
    text: 'rgb(var(--destructive))' 
  },
};

export function AttackPath({ title, score, risk, nodes, breakpoint, onRemediate }: AttackPathProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}>
              {title}
            </CardTitle>
            <RiskBadge level={risk} score={score} />
          </div>
          <Button variant="outline" size="sm" onClick={onRemediate} className="gap-1.5">
            <Shield className="size-3.5" />
            Break Chain
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {nodes.map((node, i) => {
            const isBreakpoint = node.id === breakpoint;
            const nodeStyle = nodeStyles[node.type];
            return (
              <div key={node.id} className="flex items-center gap-1 shrink-0">
                <div 
                  className="relative flex flex-col items-center gap-1.5 p-3 text-center min-w-[120px]"
                  style={{
                    backgroundColor: nodeStyle.bg,
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: nodeStyle.border,
                    borderRadius: 'var(--radius)',
                    color: nodeStyle.text,
                    outline: isBreakpoint ? '2px solid rgb(var(--primary))' : 'none',
                    outlineOffset: isBreakpoint ? '2px' : '0'
                  }}
                >
                  {isBreakpoint && (
                    <span 
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap"
                      style={{
                        fontSize: '10px',
                        fontWeight: 'var(--font-weight-medium)',
                        backgroundColor: 'rgb(var(--primary))',
                        color: 'rgb(var(--primary-foreground))',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius)'
                      }}
                    >
                      Fix here
                    </span>
                  )}
                  <div className="flex items-center gap-1.5">
                    {nodeIcons[node.type]}
                    <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}>
                      {node.label}
                    </span>
                  </div>
                  <span style={{ fontSize: '10px', opacity: 0.7, lineHeight: 1.3 }}>
                    {node.detail}
                  </span>
                </div>
                {i < nodes.length - 1 && (
                  <ArrowRight className="size-4 text-muted-foreground shrink-0 mx-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
