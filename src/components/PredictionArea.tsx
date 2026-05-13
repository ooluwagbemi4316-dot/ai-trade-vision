import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePredictions, Prediction } from "@/hooks/usePredictions";
import { ArrowUpCircle, ArrowDownCircle, History, BrainCircuit, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function PredictionArea() {
  const predictions = usePredictions();
  const currentPrediction = predictions[0];
  const history = predictions.slice(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BrainCircuit className="text-primary" />
          AI Predictions
        </h2>
        <Badge variant="outline" className="text-xs font-mono animate-pulse">
          LIVE FEED
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {predictions.slice(0, 3).map((pred, index) => (
            <PredictionCard key={pred.id} prediction={pred} isLatest={index === 0} />
          ))}
        </AnimatePresence>
      </div>

      <Card className="mt-8 border-muted">
        <div className="p-4 border-b border-border flex items-center gap-2 bg-secondary/30">
          <History size={18} className="text-muted-foreground" />
          <h3 className="font-semibold">Prediction History</h3>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-border">
            {history.map((pred) => (
              <div 
                key={pred.id} 
                className="p-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-full",
                    pred.direction === "BUY" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {pred.direction === "BUY" ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                  </div>
                  <div>
                    <div className="font-semibold">{pred.pair}</div>
                    <div className="text-xs text-muted-foreground">
                      {pred.direction} Signal • {pred.timeframe}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">Confidence: {pred.confidence}%</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                    <Clock size={10} />
                    {pred.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}

function PredictionCard({ prediction, isLatest }: { prediction: Prediction; isLatest: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <Card className={cn(
        "overflow-hidden border-2 transition-all duration-300",
        prediction.direction === "BUY" ? "border-green-500/30 bg-green-500/5" : "border-red-500/30 bg-red-500/5",
        isLatest && "ring-2 ring-primary ring-offset-2 ring-offset-background"
      )}>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{prediction.pair}</p>
              <h3 className={cn(
                "text-2xl font-black italic",
                prediction.direction === "BUY" ? "text-green-500" : "text-red-500"
              )}>
                {prediction.direction}
              </h3>
            </div>
            {isLatest && (
              <Badge className="bg-primary text-primary-foreground animate-pulse">NEW</Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Timeframe</span>
              <span className="font-semibold">{prediction.timeframe}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">Accuracy</span>
              <span className="font-semibold text-lg">{prediction.confidence}%</span>
            </div>
          </div>
          
          <div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${prediction.confidence}%` }}
              className={cn(
                "h-full rounded-full",
                prediction.direction === "BUY" ? "bg-green-500" : "bg-red-500"
              )}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}