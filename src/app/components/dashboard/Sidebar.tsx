import {
  LayoutDashboard, Shield, Bug, Route, Sparkles, Settings,
  Server, FileText, Users, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface SidebarProps {
  activeNav: string;
  onNavChange: (nav: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Bug, badge: 23 },
  { id: 'attack-paths', label: 'Attack Paths', icon: Route, badge: 12 },
  { id: 'assets', label: 'Assets', icon: Server },
  { id: 'identity', label: 'Identity', icon: Users },
  { id: 'remediation', label: 'AI Remediation', icon: Sparkles },
  { id: 'compliance', label: 'Compliance', icon: FileText },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeNav, onNavChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className="flex flex-col h-screen shrink-0 transition-all duration-200"
        style={{
          width: collapsed ? '64px' : '240px',
          backgroundColor: '#0a0f1a',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-4 h-16 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div
            className="size-8 flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #1890ff, #722ed1)',
              borderRadius: '8px',
            }}
          >
            <Shield className="size-4 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span
                style={{
                  color: 'rgba(255,255,255,0.95)',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-medium)',
                  letterSpacing: '-0.01em',
                }}
              >
                CloudShield
              </span>
              <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px' }}>
                Security Platform
              </span>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            const Icon = item.icon;
            const btn = (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className="flex items-center gap-3 w-full px-3 py-2 transition-all duration-150"
                style={{
                  borderRadius: '6px',
                  backgroundColor: isActive ? 'rgba(24,144,255,0.15)' : 'transparent',
                  color: isActive ? '#1890ff' : 'rgba(255,255,255,0.55)',
                  fontSize: 'var(--text-base)',
                  fontWeight: isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-normal)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className="flex items-center justify-center min-w-[20px] h-5 px-1.5"
                        style={{
                          fontSize: '10px',
                          fontWeight: 'var(--font-weight-medium)',
                          backgroundColor: isActive ? 'rgba(24,144,255,0.25)' : 'rgba(255,255,255,0.1)',
                          color: isActive ? '#1890ff' : 'rgba(255,255,255,0.5)',
                          borderRadius: '10px',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>{btn}</TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              );
            }
            return btn;
          })}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-3 space-y-0.5">
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginBottom: '8px' }} />
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className="flex items-center gap-3 w-full px-3 py-2 transition-all duration-150"
                style={{
                  borderRadius: '6px',
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: 'var(--text-base)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon className="size-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}

          {/* Collapse Toggle */}
          <button
            onClick={onToggleCollapse}
            className="flex items-center justify-center w-full py-2 transition-all"
            style={{ color: 'rgba(255,255,255,0.3)', borderRadius: '6px' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        </div>
      </aside>
    </TooltipProvider>
  );
}
