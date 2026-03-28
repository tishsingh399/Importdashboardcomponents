import { useState } from 'react';
import { PostureScore } from './components/dashboard/PostureScore';
import { MetricTile } from './components/dashboard/MetricTiles';
import { AttackPath } from './components/dashboard/AttackPath';
import { ExposureTable } from './components/dashboard/ExposureTable';
import { AIRemediation } from './components/dashboard/AIRemediation';
import { PostureTrend } from './components/dashboard/PostureTrend';
import { Sidebar } from './components/dashboard/Sidebar';
import { RiskBadge } from './components/dashboard/RiskBadge';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import {
  Shield, AlertTriangle, Bug, CheckCircle2, Server, Database,
  Lock, Cloud, Bell, Search, User, ChevronDown, Sparkles,
  ArrowUpRight, Activity, Zap, Filter,
} from 'lucide-react';

export default function App() {
  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const postureCategories = [
    { name: 'Network', score: 23, max: 25, icon: <Cloud className="size-4" /> },
    { name: 'Identity', score: 19, max: 25, icon: <Lock className="size-4" /> },
    { name: 'Data', score: 22, max: 25, icon: <Database className="size-4" /> },
    { name: 'Compute', score: 21, max: 25, icon: <Server className="size-4" /> },
  ];

  const attackPaths = [
    {
      id: 'path-1',
      title: 'Internet → Database Exposure',
      score: 95,
      risk: 'critical' as const,
      nodes: [
        { id: 'n1', label: 'Public Internet', type: 'entry' as const, detail: 'External threat actor' },
        { id: 'n2', label: 'Load Balancer', type: 'compute' as const, detail: 'Misconfigured ACL' },
        { id: 'n3', label: 'Web Server', type: 'compute' as const, detail: 'CVE-2024-1234' },
        { id: 'n4', label: 'IAM Role', type: 'identity' as const, detail: 'Over-privileged' },
        { id: 'n5', label: 'Customer PII', type: 'target' as const, detail: '2.3M records' },
      ],
      breakpoint: 'n3',
    },
    {
      id: 'path-2',
      title: 'Lateral Movement → Admin Takeover',
      score: 87,
      risk: 'high' as const,
      nodes: [
        { id: 'n6', label: 'Compromised Host', type: 'entry' as const, detail: 'Initial access' },
        { id: 'n7', label: 'Service Account', type: 'identity' as const, detail: 'Weak credentials' },
        { id: 'n8', label: 'Admin Console', type: 'compute' as const, detail: 'No MFA' },
        { id: 'n9', label: 'Prod Systems', type: 'target' as const, detail: 'Full control' },
      ],
      breakpoint: 'n7',
    },
  ];

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
      cvss: 9.8,
      epss: 0.97,
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
      cvss: 8.1,
      epss: 0.45,
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
      cvss: 7.5,
      epss: 0.34,
    },
    {
      id: 'CVE-2023-44487',
      title: 'HTTP/2 Rapid Reset DDoS Vector',
      risk: 'medium' as const,
      score: 54,
      asset: 'api-gateway-03',
      assetType: 'API Gateway',
      status: 'pending' as const,
      tags: ['exposed'],
      pathCount: 3,
      cvss: 5.3,
      epss: 0.12,
    },
    {
      id: 'CONF-2024-022',
      title: 'Outdated TLS 1.1 Configuration',
      risk: 'low' as const,
      score: 28,
      asset: 'legacy-api.acme.com',
      assetType: 'Load Balancer',
      status: 'resolved' as const,
      tags: ['exposed'],
      pathCount: 1,
      cvss: 3.1,
      epss: 0.02,
    },
  ];

  const remediation = {
    issueTitle: 'CVE-2024-1234: Remote Code Execution',
    issueId: 'CVE-2024-1234',
    risk: 'critical' as const,
    summary: 'This critical vulnerability allows unauthenticated attackers to execute arbitrary code on Apache web servers running versions 2.4.49-2.4.57. Active exploitation detected in the wild. Immediate patching required.',
    steps: [
      {
        step: 1,
        action: 'Update Apache to version 2.4.58',
        detail: 'sudo apt update && sudo apt upgrade apache2',
        impact: 'Closes RCE vulnerability',
      },
      {
        step: 2,
        action: 'Apply WAF rule as interim mitigation',
        detail: 'Block malicious path traversal patterns at the edge',
        impact: 'Immediate risk reduction',
      },
      {
        step: 3,
        action: 'Restart Apache service',
        detail: 'sudo systemctl restart apache2',
        impact: 'Activates security fix',
      },
      {
        step: 4,
        action: 'Verify and scan',
        detail: 'Run vulnerability scan to confirm remediation',
        impact: 'Ensures complete mitigation',
      },
    ],
    estimatedTime: '5 min',
    postureImpact: 12,
    pathsBroken: 12,
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header
          className="flex items-center justify-between px-8 py-4 border-b"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}
        >
          <div>
            <h4 style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-medium)' }}>
              Security Overview
            </h4>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
              Last updated 2 minutes ago
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="size-3.5" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="size-3.5" />
              Search
            </Button>
            <div className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="size-4" />
                <span
                  className="absolute -top-0.5 -right-0.5 size-4 flex items-center justify-center text-white"
                  style={{
                    fontSize: '9px',
                    fontWeight: 'var(--font-weight-medium)',
                    backgroundColor: 'var(--destructive)',
                    borderRadius: '50%',
                  }}
                >
                  3
                </span>
              </Button>
            </div>
            <div
              className="flex items-center gap-2 pl-3 ml-1 cursor-pointer"
              style={{ borderLeft: '1px solid var(--border)' }}
            >
              <div
                className="size-8 flex items-center justify-center text-white"
                style={{
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--chart-5))',
                  fontSize: 'var(--text-label)',
                  fontWeight: 'var(--font-weight-medium)',
                }}
              >
                TS
              </div>
              <ChevronDown className="size-3 text-muted-foreground" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1440px] mx-auto space-y-6">

            {/* Row 1: Urgent Alert Banner */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: 'linear-gradient(90deg, rgba(255,77,79,0.12) 0%, rgba(255,77,79,0.04) 60%, transparent 100%)',
                border: '1px solid rgba(255,77,79,0.25)',
                borderLeft: '4px solid #ff4d4f',
                borderRadius: 'var(--radius-card)',
              }}
            >
              <div
                className="size-6 flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'rgba(255,77,79,0.2)', borderRadius: '50%' }}
              >
                <Zap className="size-3" style={{ color: '#ff4d4f' }} />
              </div>
              <span
                className="shrink-0 px-1.5 py-0.5"
                style={{
                  fontSize: '10px', fontWeight: '700',
                  backgroundColor: '#ff4d4f', color: 'white',
                  borderRadius: '4px', letterSpacing: '0.06em', textTransform: 'uppercase',
                }}
              >
                LIVE THREAT
              </span>
              <span style={{ fontSize: 'var(--text-base)', fontWeight: '600', flexShrink: 0 }}>
                CVE-2024-1234 actively exploited
              </span>
              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                · 12 resources affected · 4 min ago
              </span>
              <div className="flex gap-2 ml-auto shrink-0">
                <Button size="sm" variant="outline" style={{ borderColor: 'rgba(255,77,79,0.3)', color: '#ff4d4f', fontSize: 'var(--text-label)' }}>
                  Dismiss
                </Button>
                <Button size="sm" style={{ backgroundColor: '#ff4d4f', color: 'white', fontSize: 'var(--text-label)' }}>
                  <Sparkles className="size-3.5 mr-1.5" />
                  AI Remediate
                </Button>
              </div>
            </div>

            {/* Row 2: Metric Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricTile
                label="Critical Vulnerabilities"
                value="23"
                change={-42}
                icon={<Bug className="size-5" />}
                invertTrend={true}
                sparkData={[89, 78, 72, 58, 42, 23]}
              />
              <MetricTile
                label="Secure Score"
                value="85/100"
                change={7}
                icon={<Shield className="size-5" />}
                invertTrend={false}
                sparkData={[62, 68, 71, 76, 80, 85]}
              />
              <MetricTile
                label="Active Attack Paths"
                value="12"
                change={-35}
                icon={<Activity className="size-5" />}
                invertTrend={true}
                sparkData={[45, 42, 38, 30, 22, 12]}
              />
              <MetricTile
                label="Exposed Resources"
                value="47"
                change={-28}
                icon={<AlertTriangle className="size-5" />}
                invertTrend={true}
                sparkData={[65, 62, 58, 55, 51, 47]}
              />
            </div>

            {/* Row 3: Posture Score + Trend Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-2">
                <PostureScore
                  score={85}
                  maxScore={100}
                  delta={5}
                  categories={postureCategories}
                />
              </div>
              <div className="lg:col-span-3">
                <PostureTrend />
              </div>
            </div>

            {/* Row 4: Attack Paths + AI Remediation */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 style={{ fontSize: 'var(--text-h5)', fontWeight: 'var(--font-weight-medium)' }}>
                    Critical Attack Paths
                  </h3>
                  <div className="flex gap-2">
                    <RiskBadge level="critical" />
                    <span className="text-muted-foreground" style={{ fontSize: 'var(--text-label)', lineHeight: '22px' }}>
                      2 paths require immediate attention
                    </span>
                  </div>
                </div>
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
              <div className="lg:col-span-2">
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
            </div>

            {/* Row 5: Exposure Table */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle style={{ fontSize: 'var(--text-h5)', fontWeight: 'var(--font-weight-medium)' }}>
                      Prioritized Exposures
                    </CardTitle>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-label)' }}>
                      AI-ranked by business impact. Showing top 5 of 47 issues.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Tabs defaultValue="all">
                      <TabsList>
                        <TabsTrigger value="all" style={{ fontSize: 'var(--text-label)' }}>All</TabsTrigger>
                        <TabsTrigger value="critical" style={{ fontSize: 'var(--text-label)' }}>Critical</TabsTrigger>
                        <TabsTrigger value="high" style={{ fontSize: 'var(--text-label)' }}>High</TabsTrigger>
                        <TabsTrigger value="medium" style={{ fontSize: 'var(--text-label)' }}>Medium</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <ExposureTable
                  exposures={exposures}
                  onViewDetails={(id) => console.log('View details', id)}
                  onRemediate={(id) => console.log('Remediate', id)}
                />
              </CardContent>
            </Card>

            {/* Row 6: Quick Stats Footer */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(82,196,26,0.1)',
                        borderRadius: 'var(--radius)',
                      }}
                    >
                      <CheckCircle2 className="size-5" style={{ color: 'rgb(82,196,26)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-medium)' }}>847</p>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                        Issues resolved this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(24,144,255,0.1)',
                        borderRadius: 'var(--radius)',
                      }}
                    >
                      <Activity className="size-5" style={{ color: 'rgb(24,144,255)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-medium)' }}>4.2h</p>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                        Avg. remediation time
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="size-10 flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(250,173,20,0.1)',
                        borderRadius: 'var(--radius)',
                      }}
                    >
                      <Sparkles className="size-5" style={{ color: 'rgb(250,173,20)' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 'var(--text-h4)', fontWeight: 'var(--font-weight-medium)' }}>93%</p>
                      <p className="text-muted-foreground" style={{ fontSize: 'var(--text-label)' }}>
                        AI recommendation accuracy
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
