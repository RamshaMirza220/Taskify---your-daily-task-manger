import { useRef, useEffect } from "react";
import { priorityConfig, type Todo } from "../constants";
import { timeAgo, formatDueDate, dueDateColor } from "../theme";

type Props = {
  todo: Todo; t: any; idx: number;
  pColor: (p: string) => { bg: string; border: string; dot: string };
  editingId: string | null; editValue: string;
  setEditValue: (v: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  startEdit: (todo: Todo) => void;
  saveEdit: (id: string) => void;
  setEditingId: (id: string | null) => void;
  dragId: string | null; dragOver: string | null;
  setDragId: (id: string | null) => void;
  setDragOver: (id: string | null) => void;
  handleDrop: (targetId: string) => void;
};

export default function TodoItem({
  todo, t, idx, pColor, editingId, editValue, setEditValue,
  toggleTodo, deleteTodo, startEdit, saveEdit, setEditingId,
  dragId, dragOver, setDragId, setDragOver, handleDrop
}: Props) {
  const editRef = useRef<HTMLInputElement>(null);
  const pc = pColor(todo.priority);

  useEffect(() => {
    if (editingId === todo.id && editRef.current) editRef.current.focus();
  }, [editingId, todo.id]);

  const dueColor = dueDateColor(todo.dueDate);
  const dueLabel = formatDueDate(todo.dueDate, todo.dueTime);

  return (
    <div className="todo-item"
      draggable
      onDragStart={() => setDragId(todo.id)}
      onDragOver={(e) => { e.preventDefault(); setDragOver(todo.id); }}
      onDrop={() => handleDrop(todo.id)}
      onDragEnd={() => { setDragId(null); setDragOver(null); }}
      style={{ display: "flex", alignItems: "center", gap: "12px",
               background: t.surface, borderRadius: "12px", padding: "14px 16px",
               border: `1px solid ${dragOver === todo.id ? t.accent : t.border}`,
               borderTop: dragOver === todo.id ? `2px solid ${t.accent}` : `1px solid ${t.border}`,
               cursor: "grab", position: "relative",
               opacity: dragId === todo.id ? 0.4 : 1,
               transform: dragId === todo.id ? "scale(0.98)" : "scale(1)",
               animation: "slideIn 0.25s ease both",
               animationDelay: `${idx * 40}ms` }}>

      <div style={{ width: "3px", height: "32px", borderRadius: "2px", background: pc.dot, flexShrink: 0 }} />

      <button className="checkbox-btn" onClick={() => toggleTodo(todo.id)}
        style={{ width: "22px", height: "22px", borderRadius: "6px", padding: 0,
                 border: `2px solid ${todo.completed ? t.accent : t.checkBorder}`,
                 background: todo.completed ? t.accent : "transparent",
                 cursor: "pointer", display: "flex", alignItems: "center",
                 justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
        {todo.completed && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        )}
      </button>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px", minWidth: 0 }}>
        {editingId === todo.id ? (
          <input ref={editRef}
            style={{ background: t.inputBg, border: `1px solid ${t.accent}`, borderRadius: "6px",
                     padding: "4px 8px", color: t.text, fontSize: "14px",
                     outline: "none", fontFamily: "inherit", width: "100%" }}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") saveEdit(todo.id); if (e.key === "Escape") setEditingId(null); }}
            onBlur={() => saveEdit(todo.id)} />
        ) : (
          <span onDoubleClick={() => startEdit(todo)}
            style={{ fontSize: "14px", fontWeight: 500, lineHeight: 1.4, wordBreak: "break-word",
                     textDecoration: todo.completed ? "line-through" : "none",
                     color: todo.completed ? t.textMuted : t.text }}>
            {todo.text}
          </span>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
          {/* Priority tag */}
          <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "5px",
                         letterSpacing: "0.3px", textTransform: "uppercase",
                         background: pc.bg, color: pc.dot, border: `1px solid ${pc.border}` }}>
            {priorityConfig[todo.priority].label}
          </span>

          {/* Due date */}
          {dueLabel && (
            <span style={{ fontSize: "11px", color: dueColor, fontWeight: 500 }}>
              📅 {dueLabel}
            </span>
          )}

          {/* Tags */}
          {todo.tags.map((tag) => (
            <span key={tag} style={{ fontSize: "10px", background: t.accentSoft,
                                     color: t.accentText, padding: "2px 6px",
                                     borderRadius: "4px", fontWeight: 600 }}>
              #{tag}
            </span>
          ))}

          <span style={{ fontSize: "11px", color: t.textDim }}>{timeAgo(todo.createdAt)}</span>
        </div>
      </div>

      {/* Hover actions */}
      <div className="todo-actions" style={{ display: "flex", gap: "4px", alignItems: "center",
                                              opacity: 0, transition: "opacity 0.15s" }}>
        <button className="action-btn" onClick={() => startEdit(todo)} title="Edit"
          style={{ background: "transparent", border: "none", color: t.textMuted,
                   cursor: "pointer", padding: "5px", borderRadius: "6px",
                   display: "flex", alignItems: "center", transition: "all 0.15s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
        <button className="action-btn delete-btn" onClick={() => deleteTodo(todo.id)} title="Delete"
          style={{ background: "transparent", border: "none", color: "#ef4444",
                   cursor: "pointer", padding: "5px", borderRadius: "6px",
                   display: "flex", alignItems: "center", transition: "all 0.15s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </button>
        <span style={{ color: t.textDim, cursor: "grab", padding: "5px", display: "flex" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </span>
      </div>
    </div>
  );
}