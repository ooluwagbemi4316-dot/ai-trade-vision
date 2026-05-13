import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Settings, 
  History, 
  ChevronLeft, 
  ChevronRight, 
  LineChart,
  Bot,
  ShieldCheck,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Bot, label: "AI Signals", id: "signals" },
    { icon: History, label: "Trade History", id: "history" },
    { icon: Settings, label: "Configuration", id: "config" },
  ];

  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 mb-4">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="p-2 bg-primary rounded-lg">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg whitespace-nowrap">AI Trader</span>
          </div>
        )}
        {collapsed && (
          <div className="p-2 bg-primary rounded-lg mx-auto">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("hidden md:flex", collapsed && "mx-auto mt-2")}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex items-center w-full gap-3 px-3 py-3 rounded-md transition-colors",
              "hover:bg-accent hover:text-accent-foreground text-muted-foreground",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <item.icon className="w-5 h-5 min-w-[20px]" />
            {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center gap-3",
          collapsed ? "justify-center" : "justify-start"
        )}>
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
            <ShieldCheck size={16} className="text-green-400" />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-semibold truncate">Premium Account</span>
              <span className="text-xs text-muted-foreground truncate">Live Trading</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}