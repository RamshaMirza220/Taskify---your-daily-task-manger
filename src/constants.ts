export const FILTERS = ["All", "Active", "Completed"];
export const PRIORITIES = ["low", "medium", "high"];
export const TAGS = ["Work", "Study", "Personal", "Urgent"];

export const priorityConfig: Record<string, { label: string; dot: string }> = {
  low:    { label: "Low",  dot: "#10b981" },
  medium: { label: "Med",  dot: "#f59e0b" },
  high:   { label: "High", dot: "#ef4444" },
};

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  priority: string;
  createdAt: number;
  dueDate?: string;      // ISO date string e.g. "2026-03-12"
  dueTime?: string;      // e.g. "21:00"
  tags: string[];
  column: "todo" | "doing" | "done";
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  todos: Todo[];
};