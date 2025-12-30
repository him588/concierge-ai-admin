export type TimeFilter = "week" | "month" | "year";

export type ChartData = {
  id: string;
  data: {
    x: string;
    y: number;
  }[];
}[];
