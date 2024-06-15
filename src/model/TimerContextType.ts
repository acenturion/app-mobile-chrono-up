import {TimerState} from "@/model/TimerState";

export interface TimerContextType {
  timer: number,
  timerState: TimerState;
  onStart: () => void,
  onPause: () => void,
  onReset: () => void,
  onSet: (newValue: string) => void,
}