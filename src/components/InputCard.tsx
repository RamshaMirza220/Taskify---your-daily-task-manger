import { useState } from "react";
import { PRIORITIES, TAGS, priorityConfig } from "../constants";

type Props = {
  t: any;
  priority: string;
  setPriority: (p: string) => void;
  inputValue: string;
  setInputValue: (v: string) => void;
  addTodo: (dueDate: string, dueTime: string, tags: string[]) => void;
  pColor: (p: string) => { bg: string; border: string; dot: string };
};

export default function InputCard({ t, priority, setPriority, inputValue, setInputValue, addTodo, pColor }: Props) {
  const [dueDate,  setDueDate]  = useState("");
  const [dueTime,  setDueTime]  = useState("");
  const [selTags,  setSelTags]  = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);

  const toggleTag = (tag: string) =>
    setSelTags((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);

  const handleAdd = () => {
    addTodo(dueDate, dueTime, selTags);
    setDueDate(""); setDueTime(""); setSelTags([]);
  };

  const inputStyle: React.CSSProperties = {
    background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: "10px",
    padding: "10px 12px", color: t.text, fontSize: "13px", outline: "none",
    fontFamily: "inherit", width: "100%", boxSizing: "border-box",
  };

  return (
    <div style={{ background: t.surface, borderRadius: "16px", padding: "16px",
                  marginBottom: "12px", border: `1px solid ${t.border}` }}>
      {/* Priority selector */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
        {PRIORITIES.map((p) => {
          const pc = pColor(p);
          const active = priority === p;
          return (
            <button key={p} className="priority-btn" onClick={() => setPriority(p)}
              style={{ padding: "4px 12px", borderRadius: "8px", cursor: "pointer",
                       fontFamily: "inherit", fontSize: "11px", fontWeight: active ? 700 : 500,
                       transition: "all 0.15s",
                       background: active ? pc.bg : "transparent",
                       border: `1px solid ${active ? pc.dot : t.border}`,
                       color: active ? pc.dot : t.textMuted }}>
              {priorityConfig[p].label}
            </button>
          );
        })}
        {/* Expand toggle for due date and tags */}
        <button onClick={() => setExpanded(!expanded)}
          style={{ marginLeft: "auto", background: "transparent", border: `1px solid ${t.border}`,
                   borderRadius: "8px", padding: "4px 10px", color: t.textMuted,
                   fontSize: "11px", cursor: "pointer", fontFamily: "inherit" }}>
          {expanded ? "▲ Less" : "▼ More"}
        </button>
      </div>

      {/* Expandable section for due date + tags */}
      {expanded && (
        <div style={{ marginBottom: "12px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={inputStyle} />
            <input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} style={inputStyle} />
          </div>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {TAGS.map((tag) => {
              const active = selTags.includes(tag);
              return (
                <button key={tag} onClick={() => toggleTag(tag)}
                  style={{ padding: "3px 10px", borderRadius: "6px", cursor: "pointer",
                           fontFamily: "inherit", fontSize: "11px", fontWeight: active ? 700 : 400,
                           background: active ? t.accentSoft : "transparent",
                           border: `1px solid ${active ? t.accent : t.border}`,
                           color: active ? t.accentText : t.textMuted }}>
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main input + add button */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input className="main-input"
          style={{ flex: 1, background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: "10px",
                   padding: "12px 14px", color: t.text, fontSize: "14px", outline: "none", fontFamily: "inherit" }}
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
        <button className="add-btn" onClick={handleAdd}
          style={{ width: "44px", height: "44px", background: t.accent, border: "none",
                   borderRadius: "10px", cursor: "pointer", display: "flex",
                   alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}