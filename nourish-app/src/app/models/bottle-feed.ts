import { Baby } from "./baby";

export interface BottleFeed {
    baby: Baby
    date: Date;
    time: number;
    ounces: number;
    notes: string;
}
