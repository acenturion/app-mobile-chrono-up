import {HistoryLap} from "@/model/HistoryLap";

export interface HistoryLapContextType {
  historyLap: HistoryLap[],
  clearHistory: (a: string) => void,
  fetchHistory: (a: string) => void,
}