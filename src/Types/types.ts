export type WidgetKey = "calendar" | "graph" | "table" | "weather";

export interface WidgetState {
  [key: string]: boolean;
}
