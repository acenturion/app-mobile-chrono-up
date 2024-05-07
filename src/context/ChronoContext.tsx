import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Lap} from "@/model/Lap";
import {Execution} from "@/model/Execution";
import {storeData} from "@/services/Storage.service";
import {ChronoState} from "@/model/ChonoState";
import {ChronoContextType} from "@/model/ChronoContextType";

const ChronoContext = createContext<ChronoContextType | null>(null)

export function useChrono(): ChronoContextType {
  const context = useContext(ChronoContext);
  if (!context) {
    throw new Error("useRates must be used within an ChronoProvider.");
  }
  return context;
}

const TimerProvider = ({children}: PropsWithChildren) => {
  const [timer, setTimer] = useState<number>(0);
  const [chronoState, setChronoState] = useState<ChronoState>({
    isPaused: false,
    isStarted: false,
    isReset: true,
  });
  const [laps, setLaps] = useState<Lap[]>([]);

  useEffect(() => {
    let interval: any;

    if (chronoState.isStarted) {
      interval = setInterval(() => {
        setTimer((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, chronoState.isStarted]);

  const onReset = () => {
    console.log("Reset Press!");
    setTimer(0);
    setChronoState({
      isReset: true,
      isStarted: false,
      isPaused: true,
    });

    if (laps.length > 0) {
      const execution: Execution = {
        id: Math.random(),
        date: new Date(),
        laps: laps,
      }

      storeData(execution);
    }
    setLaps([]);
  };

  const onLap = () => {
    console.log("Lap Press!");
    if(chronoState.isReset || chronoState.isPaused) return;
    const newLap: Lap = {
      id: laps.length + 1,
      value: timer,
    }
    setLaps([...laps, newLap]);
  };

  const onPause = () => {
    console.log("Pause Press!");
    setChronoState({isPaused: true, isStarted: false, isReset: false});
  };

  const onStart = () => {
    console.log("Start press!");
    setChronoState({isStarted: true, isPaused: false, isReset: false});
  };

  const contextValue: ChronoContextType = {
    timer,
    laps,
    chronoState,
    onStart,
    onPause,
    onReset,
    onLap,
  }

  return (
    <ChronoContext.Provider value={contextValue}>
      {children}
    </ChronoContext.Provider>
  );
}

export default TimerProvider;