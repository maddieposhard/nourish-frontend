import { Baby } from "./baby";

export interface Feed {
    baby: Baby
    date: Date;
    time: number;
    length: number;
    notes: string;
}
