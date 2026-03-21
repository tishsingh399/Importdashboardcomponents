import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Sparkles, Copy, CheckCircle, ArrowRight, Clock, TrendingDown } from "lucide-react";

interface RemediationStep {
  step: number;
  action: string;
  detail: string;
  impact?: string;
}

interface AIRemediationProps {
  issueTitle: string;
  issueId: string;
  risk: "critical" | "high" | "medium" | "low";
  summary: string;
  steps: RemediationStep[];
  estimatedTime: string;
  postureImpact: number;
  pathsBroken: number;
  onApply?: () => void;
  onCopyScript?: () => void;
}

export function AIRemediation({
  issueTitle,
  issueId,
  summary,
  steps,
  estimatedTime,
  postureImpact,
  pathsBroken,
  onApply,
  onCopyScript,
}: AIRemediationProps) {
  return (
    <Card style={{ borderColor: 'rgba(var(--primary), 0.2)' }}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="size-4 text-primary" />
          <span 
            className="text-primary" 
            style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}
          >
            AI Remediation Guide
          </span>
        </div>
        <CardTitle style={{ fontSize: 'var(--text-subtitle)' }}>{issueTitle}</CardTitle>
        <span 
          className="text-muted-foreground monospace" 
          style={{ fontSize: 'var(--text-label)' }}
        >
          {issueId}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Impact Preview */}
        <div className="flex gap-3">
          <div 
            className="flex-1 p-3"
            style={{
              backgroundColor: 'rgba(var(--chart-2), 0.1)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(var(--chart-2), 0.2)',
              borderRadius: 'var(--radius)'
            }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingDown className="size-3.5" style={{ color: 'rgb(var(--chart-2))' }} />
              <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)', color: 'rgb(var(--chart-2))' }}>
                Posture Impact
              </span>
            </div>
            <span style={{ fontSize: 'var(--text-subtitle)', fontWeight: 'var(--font-weight-medium)', color: 'rgb(var(--chart-2))' }}>
              +{postureImpact} pts
            </span>
          </div>
          <div 
            className="flex-1 p-3"
            style={{
              backgroundColor: 'rgba(var(--chart-1), 0.1)',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(var(--chart-1), 0.2)',
              borderRadius: 'var(--radius)'
            }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle className="size-3.5" style={{ color: 'rgb(var(--chart-1))' }} />
              <span style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)', color: 'rgb(var(--chart-1))' }}>
                Paths Broken
              </span>
            </div>
            <span style={{ fontSize: 'var(--text-subtitle)', fontWeight: 'var(--font-weight-medium)', color: 'rgb(var(--chart-1))' }}>
              {pathsBroken} chains
            </span>
          </div>
          <div 
            className="flex-1 p-3 bg-muted/60 border-border"
            style={{ borderWidth: '1px', borderRadius: 'var(--radius)' }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <Clock className="size-3.5 text-muted-foreground" />
              <span 
                className="text-muted-foreground" 
                style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}
              >
                Est. Time
              </span>
            </div>
            <span style={{ fontSize: 'var(--text-subtitle)', fontWeight: 'var(--font-weight-medium)' }}>
              {estimatedTime}
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="text-muted-foreground" style={{ fontSize: 'var(--text-base)', lineHeight: 1.6 }}>
          {summary}
        </div>

        <Separator />

        {/* Steps */}
        <div className="space-y-3">
          <span 
            className="text-muted-foreground uppercase tracking-wider" 
            style={{ fontSize: 'var(--text-label)', fontWeight: 'var(--font-weight-medium)' }}
          >
            Remediation Steps
          </span>
          {steps.map((step) => (
            <div key={step.step} className="flex gap-3">
              <div 
                className="flex items-center justify-center size-6 bg-primary text-primary-foreground shrink-0 mt-0.5"
                style={{ 
                  borderRadius: '50%',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--font-weight-medium)'
                }}
              >
                {step.step}
              </div>
              <div className="flex-1 min-w-0">
                <div style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)' }}>
                  {step.action}
                </div>
                <div 
                  className="text-muted-foreground mt-0.5" 
                  style={{ fontSize: 'var(--text-label)', lineHeight: 1.6 }}
                >
                  {step.detail}
                </div>
                {step.impact && (
                  <Badge 
                    variant="outline" 
                    className="mt-1.5"
                    style={{
                      fontSize: '10px',
                      borderColor: 'rgba(var(--chart-2), 0.3)',
                      color: 'rgb(var(--chart-2))',
                      backgroundColor: 'rgba(var(--chart-2), 0.1)'
                    }}
                  >
                    <ArrowRight className="size-2.5 mr-1" />
                    {step.impact}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={onApply} className="flex-1">
            <CheckCircle className="size-4 mr-1.5" />
            Apply Remediation
          </Button>
          <Button variant="outline" onClick={onCopyScript}>
            <Copy className="size-4 mr-1.5" />
            Copy Script
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
