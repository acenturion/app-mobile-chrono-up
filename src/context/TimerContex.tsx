import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {Lap} from "@/model/Lap";
import {TimerState} from "@/model/TimerState";
import {TimerContextType} from "@/model/TimerContextType";
import {Alert, Vibration} from "react-native";

const TimerContext = createContext<TimerContextType | null>(null)

export function useTimer(): TimerContextType {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useRates must be used within an TimerProvider.");
  }
  return context;
}

const TimerProvider = ({children}: PropsWithChildren) => {
  const TIMER_VALUE = 5
  const [timer, setTimer] = useState<number>(TIMER_VALUE);
  const [timerState, setTimerState] = useState<TimerState>({
    isPaused: false,
    isStarted: false,
    isReset: true,
  });

  useEffect(() => {
    let interval: any;

    if (timerState.isStarted && !timerState.isReset) {
      interval = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer, timerState.isStarted, timerState.isReset]);

  useEffect(() => {
    if (timer === 0) {
      Alert.alert('Reloj', 'Finalizo')
      Vibration.vibrate(1000)
      setTimerState({isStarted: false, isPaused: false, isReset: true});
    }
  }, [timer])

  const onReset = () => {
    setTimer(TIMER_VALUE);
    setTimerState({
      isReset: true,
      isStarted: false,
      isPaused: true,
    })
  };

  const onPause = () => {
    setTimerState({isStarted: false, isPaused: true, isReset: false});
  };

  const onStart = () => {
    if(timer === 0){
      return onReset();
    }
    setTimerState({isStarted: true, isPaused: false, isReset: false});
  };

  const contextValue: TimerContextType = {
    timer,
    timerState: timerState,
    onStart,
    onPause,
    onReset,
  }

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
}

export default TimerProvider;