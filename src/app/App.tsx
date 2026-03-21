import { PostureScore } from './components/dashboard/PostureScore';
import { MetricTile } from './components/dashboard/MetricTiles';
import { AttackPath } from './components/dashboard/AttackPath';
import { ExposureTable } from './components/dashboard/ExposureTable';
import { AIRemediation } from './components/dashboard/AIRemediation';
import { Shield, AlertTriangle, Bug, CheckCircle2, Server, Database, Lock, Cloud } from 'lucide-react';

export default function App() {
  // PostureScore data
  const postureCategories = [
    { name: 'Network', score: 23, max: 25, icon: <Cloud className="size-4" /> },
    { name: 'Identity', score: 19, max: 25, icon: <Lock className="size-4" /> },
    { name: 'Data', score: 22, max: 25, icon: <Database className="size-4" /> },
    { name: 'Compute', score: 21, max: 25, icon: <Server className="size-4" /> },
  ];

  // Attack paths data
  const attackPaths = [
    {
      id: 'path-1',
      title: 'Internet → Database Exposure',
      score: 95,
      risk: 'critical' as const,
      nodes: [
        { id: 'n1', label: 'Public Internet', type: 'entry' as const, detail: 'External threat actor' },
        { id: 'n2', label: 'Web Server', type: 'compute' as const, detail: 'CVE-2024-1234' },
        { id: 'n3', label: 'App Database', type: 'data' as const, detail: 'Weak credentials' },
        { id: 'n4', label: 'Customer PII', type: 'target' as const, detail: '2.3M records' },
      ],
      breakpoint: 'n2',
    },
    {
      id: 'path-2',
      title: 'Phishing → Admin Takeover',
      score: 87,
      risk: 'high' as const,
      nodes: [
        { id: 'n5', label: 'Email Attack', type: 'entry' as const, detail: 'Spear phishing' },
        { id: 'n6', label: 'User Desktop', type: 'compute' as const, detail: 'Malware payload' },
        { id: 'n7', label: 'Admin Account', type: 'identity' as const, detail: 'Privilege escalation' },
        { id: 'n8', label: 'Prod Systems', type: 'target' as const, detail: 'Full control' },
      ],
      breakpoint: 'n7',
    },
  ];

  // Exposure data
  const exposures = [
    {
      id: 'CVE-2024-1234',
      title: 'Remote Code Execution in Apache',
      risk: 'critical' as const,
      score: 95,
      asset: 'web-prod-01.acme.com',
      assetType: 'Web Server',
      status: 'active' as const,
      tags: ['exploited', 'exposed', 'pii'],
      pathCount: 12,
    },
    {
      id: 'IAM-2024-089',
      title: 'Overprivileged Service Account',
      risk: 'high' as const,
      score: 87,
      asset: 'svc-data-processor',
      assetType: 'Service Principal',
      status: 'active' as const,
      tags: ['admin', 'lateral'],
      pathCount: 8,
    },
    {
      id: 'NET-2024-156',
      title: 'Publicly Accessible S3 Bucket',
      risk: 'high' as const,
      score: 82,
      asset: 's3://customer-uploads',
      assetType: 'Cloud Storage',
      status: 'pending' as const,
      tags: ['exposed', 'pii'],
      pathCount: 5,
    },
    {
      id: 'CVE-2023-9876',
      title: 'Outdated SSL/TLS Configuration',
      risk: 'medium' as const,
      score: 54,
      asset: 'api-gateway-03',
      assetType: 'API Gateway',
      status: 'resolved' as const,
      tags: ['exposed'],
      pathCount: 3,
    },
  ];

  // AI Remediation data
  const remediation = {
    issueTitle: 'CVE-2024-1234: Remote Code Execution',
    issueId: 'CVE-2024-1234',
    risk: 'critical' as const,
    summary: 'This critical vulnerability allows unauthenticated attackers to execute arbitrary code on Apache web servers. Immediate patching is required to prevent exploitation.',
    steps: [
      {
        step: 1,
        action: 'Update Apache to version 2.4.58',
        detail: 'Apply security patch via package manager: sudo apt update && sudo apt upgrade apache2',
        impact: 'Closes RCE vulnerability',
      },
      {
        step: 2,
        action: 'Restart Apache service',
        detail: 'Gracefully restart to apply changes: sudo systemctl restart apache2',
        impact: 'Activates security fix',
      },
      {
        step: 3,
        action: 'Verify patch installation',
        detail: 'Confirm version and run security scan to validate remediation',
        impact: 'Ensures complete mitigation',
      },
    ],
    estimatedTime: '5 min',
    postureImpact: 12,
    pathsBroken: 12,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <h1>Security Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time security posture and threat intelligence
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Metric Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricTile
              label="Total Assets"
              value="1,234"
              change={12}
              icon={<Server className="size-5" />}
              invertTrend={false}
            />
            <MetricTile
              label="Active Vulnerabilities"
              value="47"
              change={-8}
              icon={<Bug className="size-5" />}
              invertTrend={true}
            />
            <MetricTile
              label="Critical Alerts"
              value="3"
              change={-25}
              icon={<AlertTriangle className="size-5" />}
              invertTrend={true}
            />
            <MetricTile
              label="Compliance Score"
              value="94%"
              change={2}
              icon={<CheckCircle2 className="size-5" />}
              invertTrend={false}
            />
          </div>

          {/* Posture Score and AI Remediation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PostureScore
              score={85}
              maxScore={100}
              delta={5}
              categories={postureCategories}
            />
            <AIRemediation
              issueTitle={remediation.issueTitle}
              issueId={remediation.issueId}
              risk={remediation.risk}
              summary={remediation.summary}
              steps={remediation.steps}
              estimatedTime={remediation.estimatedTime}
              postureImpact={remediation.postureImpact}
              pathsBroken={remediation.pathsBroken}
              onApply={() => console.log('Apply remediation')}
              onCopyScript={() => console.log('Copy script')}
            />
          </div>

          {/* Attack Paths */}
          <div className="space-y-4">
            <h2>Critical Attack Paths</h2>
            {attackPaths.map((path) => (
              <AttackPath
                key={path.id}
                id={path.id}
                title={path.title}
                score={path.score}
                risk={path.risk}
                nodes={path.nodes}
                breakpoint={path.breakpoint}
                onRemediate={() => console.log('Remediate', path.id)}
              />
            ))}
          </div>

          {/* Exposure Table */}
          <div>
            <h2 className="mb-4">Top Security Exposures</h2>
            <ExposureTable
              exposures={exposures}
              onViewDetails={(id) => console.log('View details', id)}
              onRemediate={(id) => console.log('Remediate', id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
