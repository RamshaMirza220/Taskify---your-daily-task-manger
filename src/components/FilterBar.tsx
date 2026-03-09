import { FILTERS, type Todo } from "../constants";

type Props = {
  t: any; filter: string;
  setFilter: (f: string) => void;
  todos: Todo[]; activeCount: number; completedCount: number;
  clearCompleted: () => void;
};

export default function FilterBar({ t, filter, setFilter, todos, activeCount, completedCount, clearCompleted }: Props) {
  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "16px", alignItems: "center", flexWrap: "wrap" }}>
      {FILTERS.map((f) => {
        const active = filter === f;
        const count  = f === "All" ? todos.length : f === "Active" ? activeCount : completedCount;
        return (
          <button key={f} className="filter-btn" onClick={() => setFilter(f)}
            style={{ background: active ? t.accentSoft : "transparent",
                     border: `1px solid ${active ? t.accent : t.border}`,
                     borderRadius: "8px", padding: "6px 14px",
                     color: active ? t.accentText : t.textMuted, fontSize: "13px",
                     cursor: "pointer", fontFamily: "inherit",
                     display: "flex", alignItems: "center", gap: "6px", transition: "all 0.15s" }}>
            {f}
            <span style={{ fontSize: "11px", background: t.filterCount, padding: "1px 6px",
                           borderRadius: "10px", color: t.textMuted, opacity: active ? 1 : 0.6 }}>
              {count}
            </span>
          </button>
        );
      })}
      {completedCount > 0 && (
        <button className="clear-btn" onClick={clearCompleted}
          style={{ marginLeft: "auto", background: "transparent", border: "none",
                   color: t.textMuted, fontSize: "12px", cursor: "pointer",
                   fontFamily: "inherit", padding: "6px 8px" }}>
          Clear done
        </button>
      )}
    </div>
  );
}