import {HistoryLap} from "@/model/HistoryLap";

export interface HistoryLapContextType {
  historyLap: HistoryLap[],
  loading: boolean,
  clearHistory: (a: string) => void,
  fetchHistory: (a: string) => void,
}