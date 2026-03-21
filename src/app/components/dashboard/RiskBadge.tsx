import { Badge } from "../ui/badge";

type RiskLevel = "critical" | "high" | "medium" | "low" | "info";

const riskConfig: Record<RiskLevel, { label: string; style: React.CSSProperties }> = {
  critical: { 
    label: "Critical", 
    style: { 
      backgroundColor: 'rgb(var(--destructive))',
      color: 'rgb(var(--destructive-foreground))',
      borderColor: 'transparent'
    }
  },
  high: { 
    label: "High", 
    style: { 
      backgroundColor: 'rgb(var(--chart-4))',
      color: 'white',
      borderColor: 'transparent'
    }
  },
  medium: { 
    label: "Medium", 
    style: { 
      backgroundColor: 'rgb(var(--chart-3))',
      color: 'rgba(0, 0, 0, 0.85)',
      borderColor: 'transparent'
    }
  },
  low: { 
    label: "Low", 
    style: { 
      backgroundColor: 'rgb(var(--chart-2))',
      color: 'white',
      borderColor: 'transparent'
    }
  },
  info: { 
    label: "Info", 
    style: { 
      backgroundColor: 'rgba(var(--chart-1), 0.1)',
      color: 'rgb(var(--chart-1))',
      borderColor: 'transparent'
    }
  },
};

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  className?: string;
}

export function RiskBadge({ level, score, className = "" }: RiskBadgeProps) {
  const config = riskConfig[level];
  return (
    <Badge 
      className={className} 
      style={{
        ...config.style,
        fontSize: 'var(--text-label)',
        fontWeight: 'var(--font-weight-medium)'
      }}
    >
      {config.label}{score !== undefined ? ` ${score}` : ""}
    </Badge>
  );
}

type StatusType = "active" | "pending" | "expired" | "revoked" | "resolved";

const statusConfig: Record<StatusType, { label: string; colorVar: string }> = {
  active: { label: "Active", colorVar: "chart-2" },
  pending: { label: "Pending", colorVar: "chart-3" },
  expired: { label: "Expired", colorVar: "muted" },
  revoked: { label: "Revoked", colorVar: "destructive" },
  resolved: { label: "Resolved", colorVar: "chart-1" },
};

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge 
      variant="outline" 
      className={className}
      style={{
        backgroundColor: `rgba(var(--${config.colorVar}), 0.1)`,
        color: `rgb(var(--${config.colorVar}))`,
        borderColor: `rgba(var(--${config.colorVar}), 0.3)`,
        fontSize: 'var(--text-label)',
        fontWeight: 'var(--font-weight-medium)'
      }}
    >
      {config.label}
    </Badge>
  );
}
