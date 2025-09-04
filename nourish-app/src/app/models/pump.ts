export interface Pump {
    id: number;
    date: Date;
    time: number | string;
    length: number | null;
    ounces: number | null;
    notes: string;
}
