import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { RiskBadge, StatusBadge } from "./RiskBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ExternalLink, Zap, AlertTriangle, Eye } from "lucide-react";

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

export function ExposureTable({ exposures, onViewDetails, onRemediate }: ExposureTableProps) {
  return (
    <TooltipProvider>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[280px]">Issue</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead>Asset</TableHead>
            <TableHead>Context</TableHead>
            <TableHead className="text-right">Paths</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right w-[140px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exposures.map((exp) => (
            <TableRow key={exp.id} className="group">
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontWeight: 'var(--font-weight-medium)', fontSize: 'var(--text-base)' }}>
                    {exp.title}
                  </span>
                  <span 
                    className="text-muted-foreground monospace" 
                    style={{ fontSize: 'var(--text-monospace)' }}
                  >
                    {exp.id}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <RiskBadge level={exp.risk} score={exp.score} />
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-0.5">
                  <span 
                    className="monospace truncate max-w-[160px]" 
                    style={{ fontSize: 'var(--text-base)' }}
                  >
                    {exp.asset}
                  </span>
                  <span className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
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
                          className="inline-flex items-center gap-1 bg-muted text-muted-foreground"
                          style={{
                            fontSize: '10px',
                            fontWeight: 'var(--font-weight-medium)',
                            padding: '2px 6px',
                            borderRadius: 'var(--radius)'
                          }}
                        >
                          {tag === "exploited" && <Zap className="size-2.5" style={{ color: 'rgb(var(--destructive))' }} />}
                          {tag === "exposed" && <ExternalLink className="size-2.5" style={{ color: 'rgb(var(--chart-4))' }} />}
                          {tag === "lateral" && <AlertTriangle className="size-2.5" style={{ color: 'rgb(var(--chart-3))' }} />}
                          {tag}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {tag === "exploited" && "Actively exploited in the wild"}
                        {tag === "exposed" && "Internet-facing, publicly accessible"}
                        {tag === "lateral" && "Lateral movement path exists"}
                        {tag === "pii" && "Accesses personally identifiable information"}
                        {tag === "admin" && "Has administrative privileges"}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right monospace" style={{ fontSize: 'var(--text-base)' }}>
                {exp.pathCount}
              </TableCell>
              <TableCell>
                <StatusBadge status={exp.status} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-1 justify-end opacity-70 group-hover:opacity-100 transition-opacity">
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
                    className="h-7 px-2 text-destructive hover:text-destructive"
                    style={{ fontSize: 'var(--text-label)' }}
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
