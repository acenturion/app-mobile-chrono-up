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
import {useNavigation} from "@react-navigation/core";
import {Execution} from "@/model/Execution";
import {useUser} from "@/context/UserContext";

const HistoryLapContext = createContext<HistoryLapContextType | null>(null);

export function useHistoryLap(): HistoryLapContextType {
  const context = useContext(HistoryLapContext);
  if (!context) {
    throw new Error("useHistoryLap must be used within an HistoryLapProvider.");
  }
  return context;
}

const HistoryLapProvider = ({children}: PropsWithChildren) => {
  const navigation = useNavigation();
  const {user} = useUser();
  const [historyLap, setHistoryLap] = useState<HistoryLap[]>([]);

  useEffect(() => {
    //navigation.addListener('focus', () => {
    const getHistory = async () => {
      const result = await getHistoryRecord();
      setHistoryLap(result);
    }
    getHistory();
    //});
  }, []);

  const clearHistory = async () => {
    console.log("Limpiando Ejecuciones...")
    await clearByUserId(user.id)
    return [];
  }

  const getHistoryRecord = async () => {
    const results: Execution[] = await getByUserId(user.id)
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
    clearHistory
  };

  return (
    <HistoryLapContext.Provider value={contextValue}>
      {children}
    </HistoryLapContext.Provider>
  );
};

export default HistoryLapProvider;
