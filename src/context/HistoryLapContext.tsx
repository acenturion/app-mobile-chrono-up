import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {HistoryLapContextType} from "@/model/HistoryLapContextType";
import {clearByUserId, getByUserId} from "@/services/RemoteStorage.service";
import {HistoryLap} from "@/model/HistoryLap";
import {Execution} from "@/model/Execution";

const HistoryLapContext = createContext<HistoryLapContextType | null>(null);

export function useHistoryLap(): HistoryLapContextType {
  const context = useContext(HistoryLapContext);
  if (!context) {
    throw new Error("useHistoryLap must be used within an HistoryLapProvider.");
  }
  return context;
}

const HistoryLapProvider = ({children}: PropsWithChildren) => {

  const [historyLap, setHistoryLap] = useState<HistoryLap[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const clearHistory = async (userId: string) => {
    console.log("Limpiando Ejecuciones...")
    setHistoryLap([]);
    await clearByUserId(userId)
  }

  const fetchHistory = async (userId: string) => {
    setLoading(true)
    console.log("Buscando en el historial...")
    const result = await getHistoryRecord(userId);
    console.log("Listo ;)")
    setHistoryLap(result);
    setLoading(false)
  }

  const getHistoryRecord = async (userId: string) => {
    const results: Execution[] = await getByUserId(userId)
    const history: HistoryLap[] = results.map(result => {
      return {
        id: result.id,
        date: result.date,
        laps: result.laps,
        location: result.location
      }
    })
    return history;
  }

  const contextValue: HistoryLapContextType = {
    historyLap,
    loading,
    clearHistory,
    fetchHistory,
  };

  return (
    <HistoryLapContext.Provider value={contextValue}>
      {children}
    </HistoryLapContext.Provider>
  );
};

export default HistoryLapProvider;
