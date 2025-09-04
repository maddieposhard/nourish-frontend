import { Baby } from "./baby";

export interface Feed {
  id?: number;          // optional, from backend
  baby: Baby;
  date: Date;
  time: string;         // HH:mm string
  type: 'breast' | 'bottle';
  length?: number;      // optional, for breastfeeds
  ounces?: number;      // optional, for bottle feeds
  notes?: string;
}