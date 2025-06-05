
export interface SelectedDate {
  year: number;
  month: number;
  day: number;
}

export interface Note {
  id: string;
  dates: string[];
  content: string;
  createdAt: Date;
  color: string;
}
