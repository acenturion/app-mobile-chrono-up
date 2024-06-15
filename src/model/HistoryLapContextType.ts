import {HistoryLap} from "@/model/HistoryLap";

export interface HistoryLapContextType {
  historyLap: HistoryLap[],
  clearHistory: () => void,
}