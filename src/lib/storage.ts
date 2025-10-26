import { format } from "date-fns";

export interface DayEntry {
  date: string;
  goals: string;
  notes: string;
  reminderTime: string;
  notificationsEnabled: boolean;
}

const STORAGE_KEY = "daily-goals-data";

export const loadEntry = (date: Date): DayEntry => {
  const dateKey = format(date, "yyyy-MM-dd");
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    try {
      const data = JSON.parse(stored);
      return data[dateKey] || getDefaultEntry(dateKey);
    } catch {
      return getDefaultEntry(dateKey);
    }
  }
  
  return getDefaultEntry(dateKey);
};

export const saveEntry = (entry: DayEntry): void => {
  const stored = localStorage.getItem(STORAGE_KEY);
  let data: Record<string, DayEntry> = {};
  
  if (stored) {
    try {
      data = JSON.parse(stored);
    } catch {
      data = {};
    }
  }
  
  data[entry.date] = entry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const getDefaultEntry = (dateKey: string): DayEntry => ({
  date: dateKey,
  goals: "",
  notes: "",
  reminderTime: "09:00",
  notificationsEnabled: false,
});
