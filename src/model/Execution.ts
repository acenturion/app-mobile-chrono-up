import { Lap } from "./Lap";

export interface Execution {
    id: number;
    date: Date,
    laps: Lap[]
}