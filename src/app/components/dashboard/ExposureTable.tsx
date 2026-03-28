import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { RiskBadge, StatusBadge } from "./RiskBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ExternalLink, Zap, AlertTriangle, Eye, Lock, User } from "lucide-react";

interface Exposure {
  id: string;
  title: string;
  risk: "critical" | "high" | "medium" | "low";
  score: number;
  asset: string;
  assetType: string;
  status: "active" | "pending" | "resolved";
  tags: string[];
  pathCount: number;
  cvss?: number;
  epss?: number;
}

interface ExposureTableProps {
  exposures: Exposure[];
  onViewDetails?: (id: string) => void;
  onRemediate?: (id: string) => void;
}

const tagIcons: Record<string, React.ReactNode> = {
  exploited: <Zap className="size-2.5" style={{ color: '#ff4d4f' }} />,
  exposed: <ExternalLink className="size-2.5" style={{ color: '#1890ff' }} />,
  lateral: <AlertTriangle className="size-2.5" style={{ color: '#faad14' }} />,
  pii: <Lock className="size-2.5" style={{ color: '#722ed1' }} />,
  admin: <User className="size-2.5" style={{ color: '#13c2c2' }} />,
};

const tagTooltips: Record<string, string> = {
  exploited: "Actively exploited in the wild",
  exposed: "Internet-facing, publicly accessible",
  lateral: "Lateral movement path exists",
  pii: "Accesses personally identifiable information",
  admin: "Has administrative privileges",
};

function EpssBar({ value }: { value: number }) {
  const pct = value * 100;
  const color = pct >= 50 ? '#ff4d4f' : pct >= 20 ? '#faad14' : '#52c41a';
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-14 h-1.5 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-1.5 rounded-full"
          style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: color }}
        />
      </div>
      <span style={{ fontSize: '11px', fontWeight: '600', color, minWidth: '32px' }}>
        {pct.toFixed(0)}%
      </span>
    </div>
  );
}

export function ExposureTable({ exposures, onViewDetails, onRemediate }: ExposureTableProps) {
  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <TableHead className="w-[260px]">Issue</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help border-b border-dashed" style={{ borderColor: 'var(--muted-foreground)' }}>
                    CVSS
                  </span>
                </TooltipTrigger>
                <TooltipContent>Common Vulnerability Scoring System — 0-10 severity score</TooltipContent>
              </Tooltip>
            </TableHead>
            <TableHead>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help border-b border-dashed" style={{ borderColor: 'var(--muted-foreground)' }}>
                    EPSS
                  </span>
                </TooltipTrigger>
                <TooltipContent>Exploit Prediction Scoring System — probability of exploitation in 30 days</TooltipContent>
              </Tooltip>
            </TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Context</TableHead>
            <TableHead className="text-right">Paths</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exposures.map((exp) => (
            <TableRow
              key={exp.id}
              className="group"
              style={{
                borderColor: 'rgba(255,255,255,0.04)',
                backgroundColor: exp.risk === 'critical' ? 'rgba(255,77,79,0.025)' : 'transparent',
              }}
            >
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontWeight: '500', fontSize: 'var(--text-base)' }}>
                    {exp.title}
                  </span>
                  <span
                    className="text-muted-foreground font-mono"
                    style={{ fontSize: '11px' }}
                  >
                    {exp.id}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <RiskBadge level={exp.risk} score={exp.score} />
              </TableCell>
              <TableCell>
                {exp.cvss !== undefined && (
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: exp.cvss >= 9 ? '#ff4d4f' : exp.cvss >= 7 ? '#faad14' : exp.cvss >= 4 ? '#1890ff' : 'var(--muted-foreground)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {exp.cvss.toFixed(1)}
                  </span>
                )}
              </TableCell>
              <TableCell>
                {exp.epss !== undefined && <EpssBar value={exp.epss} />}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span
                    className="font-mono truncate max-w-[140px] block"
                    style={{ fontSize: '12px' }}
                  >
                    {exp.asset}
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: '11px' }}>
                    {exp.assetType}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {exp.tags.map((tag) => (
                    <Tooltip key={tag}>
                      <TooltipTrigger asChild>
                        <span
                          className="inline-flex items-center gap-1"
                          style={{
                            fontSize: '10px',
                            fontWeight: '600',
                            padding: '2px 6px',
                            borderRadius: '99px',
                            backgroundColor: 'rgba(255,255,255,0.06)',
                            color: 'var(--muted-foreground)',
                            cursor: 'default',
                            letterSpacing: '0.02em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {tagIcons[tag]}
                          {tag}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{tagTooltips[tag]}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right font-mono" style={{ fontSize: 'var(--text-base)' }}>
                <span
                  style={{
                    color: exp.pathCount >= 10 ? '#ff4d4f' : exp.pathCount >= 5 ? '#faad14' : 'var(--foreground)',
                    fontWeight: exp.pathCount >= 5 ? '600' : 'normal',
                  }}
                >
                  {exp.pathCount}
                </span>
              </TableCell>
              <TableCell>
                <StatusBadge status={exp.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-1 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    style={{ fontSize: 'var(--text-label)' }}
                    onClick={() => onViewDetails?.(exp.id)}
                  >
                    <Eye className="size-3.5 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    style={{
                      fontSize: 'var(--text-label)',
                      color: exp.risk === 'critical' ? '#ff4d4f' : undefined,
                    }}
                    onClick={() => onRemediate?.(exp.id)}
                  >
                    Fix
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
