import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Timer, ArrowRightLeft } from "lucide-react";
import { toast } from "sonner";

export function TradingControls() {
  const [pair, setPair] = useState("EUR/USD");
  const [duration, setDuration] = useState("1");
  const [unit, setUnit] = useState("Minutes");

  const handleApply = () => {
    toast.success(`Trading context updated to ${pair} | ${duration} ${unit}`);
  };

  return (
    <Card className="shadow-lg border-muted h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-primary" />
          Trading Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Search size={14} className="text-muted-foreground" />
            Trading Pair
          </Label>
          <Select value={pair} onValueChange={setPair}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select pair" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR/USD">EUR / USD</SelectItem>
              <SelectItem value="GBP/JPY">GBP / JPY</SelectItem>
              <SelectItem value="BTC/USDT">BTC / USDT</SelectItem>
              <SelectItem value="ETH/USD">ETH / USD</SelectItem>
              <SelectItem value="AUD/USD">AUD / USD</SelectItem>
              <SelectItem value="USD/JPY">USD / JPY</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Timer size={14} className="text-muted-foreground" />
            Candle Timeframe
          </Label>
          <div className="flex gap-2">
            <Input
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-20"
            />
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Seconds">Seconds</SelectItem>
                <SelectItem value="Minutes">Minutes</SelectItem>
                <SelectItem value="Hours">Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleApply} className="w-full font-semibold" variant="secondary">
          Apply Changes
        </Button>
      </CardContent>
    </Card>
  );
}