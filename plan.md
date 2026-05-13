# AI Trading Assistant UI Plan

Build a responsive, modern dark-themed web application for an AI trading assistant.

## 1. Core Layout Structure
- **Main Layout**: A flexible container with a collapsible sidebar and a main content area.
- **Sidebar**: Collapsible navigation with links to Dashboard, Configuration, History, and Settings.
- **Theme**: Force dark mode or provide a toggle (user requested dark mode).

## 2. Components to Implement
### Configuration Panel
- **API Status Indicator**: Visual div with dynamic state (Connected/Disconnected/Error).
- **Credentials Form**: Input fields for API Key and Secret with validation.
- **Actions**: "Save Credentials" and "Test Connection" buttons.

### Trading Controls Panel
- **Pair Selection**: Searchable autocomplete for trading pairs (EUR/USD, GBP/JPY, etc.).
- **Timeframe Config**: Duration input (number) and unit selector (Seconds, Minutes, Hours).
- **Apply Action**: Button to update the current trading context.

### AI Prediction Display
- **Live Cards**: Real-time BUY/SELL signals with distinct color coding (Green/Red).
- **Animations**: Entrance and update animations using `framer-motion`.
- **WebSocket Mock**: A hook or utility to simulate incoming real-time predictions.

### Historical Log
- **Prediction History**: A scrollable list of the last 20 signals.
- **Data Points**: Time, Pair, Direction, and Result (Win/Loss/Pending).

## 3. Technical Implementation
- **State Management**: React `useState` and `useEffect` for local UI state and mock socket data.
- **Notifications**: `sonner` for feedback on "Save", "Test Connection", and "Apply".
- **Styling**: Tailwind CSS for responsive grid/flexbox layouts.
- **Icons**: `lucide-react`.
- **Animations**: `framer-motion` for card entries.

## 4. File Structure
- `src/App.tsx`: Main entry and layout.
- `src/components/Sidebar.tsx`: Navigation component.
- `src/components/ConfigPanel.tsx`: API settings.
- `src/components/TradingControls.tsx`: Pair and timeframe settings.
- `src/components/PredictionArea.tsx`: Live signals and history.
- `src/hooks/usePredictions.ts`: Mock socket logic.
