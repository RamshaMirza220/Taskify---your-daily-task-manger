import { type Todo } from "../constants";

type Props = {
  t: any;
  todos: Todo[];
  onClose: () => void;
};

export default function AnalyticsPanel({ t, todos, onClose }: Props) {
  // Calculate tasks completed in the last 7 days
  const now = Date.now();
  const week = 7 * 24 * 3600 * 1000;

  const completedThisWeek = todos.filter(
    (td) => td.completed && now - td.createdAt < week
  ).length;

  const completionRate = todos.length > 0
    ? Math.round((todos.filter((td) => td.completed).length / todos.length) * 100)
    : 0;

  const avgPerDay = Math.round(todos.length / 7) || 0;

  // Daily completed breakdown for the mini chart (last 7 days)
  const days = Array.from({ length: 7 }, (_, i) => {
    const dayStart = now - (6 - i) * 24 * 3600 * 1000;
    const dayEnd   = dayStart + 24 * 3600 * 1000;
    const count    = todos.filter(
      (td) => td.completed && td.createdAt >= dayStart && td.createdAt < dayEnd
    ).length;
    const label = new Date(dayStart).toLocaleDateString("en-US", { weekday: "short" });
    return { label, count };
  });

  const maxCount = Math.max(...days.map((d) => d.count), 1);

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40, background: "#00000060" }} />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                    zIndex: 50, background: t.surface, border: `1px solid ${t.border}`,
                    borderRadius: "20px", padding: "28px", width: "90%", maxWidth: "480px",
                    boxShadow: t.cardShadow }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ color: t.text, margin: 0, fontSize: "18px", fontWeight: 800 }}>📊 Analytics</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: t.textMuted,
                                             cursor: "pointer", fontSize: "20px" }}>×</button>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "This week",        value: completedThisWeek, icon: "✅" },
            { label: "Completion rate",  value: `${completionRate}%`, icon: "🎯" },
            { label: "Avg / day",        value: avgPerDay, icon: "📅" },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ background: t.bg, border: `1px solid ${t.border}`,
                                      borderRadius: "12px", padding: "14px 10px", textAlign: "center" }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{icon}</div>
              <div style={{ color: t.text, fontWeight: 800, fontSize: "20px" }}>{value}</div>
              <div style={{ color: t.textMuted, fontSize: "11px", marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Mini bar chart */}
        <p style={{ color: t.textMuted, fontSize: "12px", marginBottom: "10px" }}>Tasks completed — last 7 days</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "80px" }}>
          {days.map(({ label, count }) => (
            <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column",
                                      alignItems: "center", gap: "4px", height: "100%" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                <div style={{ width: "100%", height: `${(count / maxCount) * 100}%`,
                              minHeight: count > 0 ? "6px" : "0",
                              background: count > 0 ? "#6366f1" : t.border,
                              borderRadius: "4px 4px 0 0", transition: "height 0.3s" }} />
              </div>
              <span style={{ fontSize: "10px", color: t.textDim }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}