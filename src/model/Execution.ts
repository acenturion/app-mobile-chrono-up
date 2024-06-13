import { Lap } from "./Lap";
import { Location } from "./Location";

export interface Execution {
    id: number;
    date: Date,
    laps: Lap[],
    location?: Location
}