import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Key, Shield, Wifi, WifiOff, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ConfigPanel() {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [status, setStatus] = useState<"Connected" | "Disconnected" | "Error">("Disconnected");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (!apiKey || !apiSecret) {
      toast.error("Please enter both API Key and Secret");
      return;
    }
    toast.success("Credentials saved securely");
  };

  const handleTestConnection = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2;
      setStatus(isSuccess ? "Connected" : "Error");
      if (isSuccess) {
        toast.success("Pocket Option API connection successful!");
      } else {
        toast.error("Connection failed. Check your credentials.");
      }
      setLoading(false);
    }, 1500);
  };

  const statusColors = {
    Connected: "bg-green-500",
    Disconnected: "bg-slate-500",
    Error: "bg-red-500",
  };

  const StatusIcon = {
    Connected: Wifi,
    Disconnected: WifiOff,
    Error: AlertCircle,
  }[status];

  return (
    <Card className="shadow-lg border-muted">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">API Configuration</CardTitle>
            <CardDescription>Manage your Pocket Option integration</CardDescription>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium bg-secondary/50",
            status === "Connected" ? "border-green-500/20" : status === "Error" ? "border-red-500/20" : "border-muted"
          )}>
            <span className={cn("w-2 h-2 rounded-full animate-pulse", statusColors[status])} />
            <span className={cn(
              status === "Connected" ? "text-green-500" : status === "Error" ? "text-red-500" : "text-muted-foreground"
            )}>
              {status}
            </span>
            <StatusIcon size={12} className={cn(
               status === "Connected" ? "text-green-500" : status === "Error" ? "text-red-500" : "text-muted-foreground"
            )} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="api-key"
                type="text"
                placeholder="Enter your Pocket Option API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-secret">API Secret</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="api-secret"
                type="password"
                placeholder="Enter your API Secret"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button onClick={handleSave} className="flex-1">
            Save Credentials
          </Button>
          <Button 
            variant="outline" 
            onClick={handleTestConnection} 
            disabled={loading}
            className="flex-1"
          >
            {loading ? "Testing..." : "Test Connection"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}