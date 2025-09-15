import { Baby } from "./baby";

export interface Feed {
  id: number;          // optional, from backend
  baby_id: number;
  date: Date | string; // ISO date string
  time: string;         // HH:mm string
  feed_type: 'breast' | 'bottle';
  length?: number;      // optional, for breastfeeds
  ounces?: number;      // optional, for bottle feeds
  notes?: string;
}