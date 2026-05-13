import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { ConfigPanel } from "./components/ConfigPanel";
import { TradingControls } from "./components/TradingControls";
import { PredictionArea } from "./components/PredictionArea";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground dark">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <main className={cn(
        "flex-1 transition-all duration-300 overflow-y-auto h-screen",
        "p-4 md:p-8"
      )}>
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Trading Dashboard</h1>
              <p className="text-muted-foreground">Welcome back. AI assistant is monitoring the markets.</p>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg border border-border">
              <div className="px-3 py-1.5 rounded-md bg-background text-xs font-medium shadow-sm">Real-time</div>
              <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Analytics</div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ConfigPanel />
            </div>
            <div>
              <TradingControls />
            </div>
          </div>

          <div className="pt-4">
            <PredictionArea />
          </div>
        </div>
      </main>
      
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
}

export default App;