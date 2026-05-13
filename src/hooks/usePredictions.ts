import { useState, useEffect } from "react";

export interface Prediction {
  id: string;
  pair: string;
  direction: "BUY" | "SELL";
  timeframe: string;
  timestamp: Date;
  confidence: number;
}

const TRADING_PAIRS = ["EUR/USD", "GBP/JPY", "BTC/USDT", "ETH/USD", "AUD/USD", "USD/JPY"];
const TIMEFRAMES = ["30s", "1m", "5m", "15m"];

export function usePredictions() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    // Initial data
    const initial: Prediction[] = Array.from({ length: 5 }).map((_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      pair: TRADING_PAIRS[Math.floor(Math.random() * TRADING_PAIRS.length)],
      direction: Math.random() > 0.5 ? "BUY" : "SELL",
      timeframe: TIMEFRAMES[Math.floor(Math.random() * TIMEFRAMES.length)],
      timestamp: new Date(Date.now() - i * 60000),
      confidence: Math.floor(Math.random() * 20) + 75,
    }));
    setPredictions(initial);

    // Mock WebSocket incoming data
    const interval = setInterval(() => {
      const newPrediction: Prediction = {
        id: Math.random().toString(36).substr(2, 9),
        pair: TRADING_PAIRS[Math.floor(Math.random() * TRADING_PAIRS.length)],
        direction: Math.random() > 0.5 ? "BUY" : "SELL",
        timeframe: TIMEFRAMES[Math.floor(Math.random() * TIMEFRAMES.length)],
        timestamp: new Date(),
        confidence: Math.floor(Math.random() * 20) + 75,
      };

      setPredictions((prev) => [newPrediction, ...prev].slice(0, 20));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return predictions;
}