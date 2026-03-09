export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  const hrs  = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs  < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

// Returns color based on due date urgency
export function dueDateColor(dueDate?: string): string {
  if (!dueDate) return "#6b7280";
  const today = new Date().toISOString().split("T")[0];
  if (dueDate < today)  return "#ef4444"; // overdue
  if (dueDate === today) return "#f59e0b"; // due today
  return "#10b981"; // upcoming
}

export function formatDueDate(dueDate?: string, dueTime?: string): string {
  if (!dueDate) return "";
  const date = new Date(dueDate + (dueTime ? `T${dueTime}` : ""));
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    + (dueTime ? ", " + date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }) : "");
}

export const THEMES: Record<string, any> = {
  dark: {
    bg: "#0d0f14", surface: "#13151e", surfaceHover: "#161825",
    border: "#1e2130", borderHover: "#252836",
    text: "#f3f4f6", textMuted: "#6b7280", textDim: "#4b5563",
    accent: "#6366f1", accentHover: "#4f46e5", accentSoft: "#1e2033", accentText: "#a5b4fc",
    checkBorder: "#374151", progressBg: "#1e2130", inputBg: "#0d0f14",
    statBg: "#1a1d26", filterCount: "#252836", searchBg: "#13151e", toggleBg: "#1e2130",
    deleteBg: "#1f1416", toggleIcon: "☀️", toggleLabel: "Light mode",
    tagBg: (dot: string) => dot + "22", tagBorder: (dot: string) => dot + "33",
    cardShadow: "0 2px 12px #00000040",
  },
  light: {
    bg: "#f0f2f5", surface: "#ffffff", surfaceHover: "#fafafa",
    border: "#e5e7eb", borderHover: "#d1d5db",
    text: "#111827", textMuted: "#6b7280", textDim: "#9ca3af",
    accent: "#6366f1", accentHover: "#4f46e5", accentSoft: "#eef2ff", accentText: "#4338ca",
    checkBorder: "#d1d5db", progressBg: "#e5e7eb", inputBg: "#f9fafb",
    statBg: "#f3f4f6", filterCount: "#e5e7eb", searchBg: "#ffffff", toggleBg: "#e5e7eb",
    deleteBg: "#fef2f2", toggleIcon: "🌙", toggleLabel: "Dark mode",
    tagBg: (dot: string) => dot + "18", tagBorder: (dot: string) => dot + "44",
    cardShadow: "0 2px 12px #00000010",
  },
};