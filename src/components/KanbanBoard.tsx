import { type Todo, priorityConfig } from "../constants";
import { timeAgo } from "../theme";

type Props = {
  t: any;
  todos: Todo[];
  onMoveColumn: (id: string, column: Todo["column"]) => void;
  onDelete: (id: string) => void;
};

const COLUMNS: { key: Todo["column"]; label: string; icon: string }[] = [
  { key: "todo",  label: "To Do",  icon: "📋" },
  { key: "doing", label: "Doing",  icon: "⚡" },
  { key: "done",  label: "Done",   icon: "✅" },
];

export default function KanbanBoard({ t, todos, onMoveColumn, onDelete }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
      {COLUMNS.map((col) => {
        const colTodos = todos.filter((td) => td.column === col.key);
        return (
          <div key={col.key} style={{ background: t.bg, border: `1px solid ${t.border}`,
                                      borderRadius: "16px", padding: "16px", minHeight: "300px" }}>
            {/* Column header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{col.icon}</span>
                <span style={{ color: t.text, fontWeight: 700, fontSize: "14px" }}>{col.label}</span>
              </div>
              <span style={{ background: t.surface, border: `1px solid ${t.border}`,
                             borderRadius: "10px", padding: "2px 8px",
                             fontSize: "11px", color: t.textMuted }}>
                {colTodos.length}
              </span>
            </div>

            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {colTodos.map((todo) => {
                const pc = priorityConfig[todo.priority];
                return (
                  <div key={todo.id} style={{ background: t.surface, border: `1px solid ${t.border}`,
                                              borderRadius: "10px", padding: "12px",
                                              borderLeft: `3px solid ${pc.dot}` }}>
                    <p style={{ color: t.text, fontSize: "13px", fontWeight: 500,
                                margin: "0 0 8px", lineHeight: 1.4,
                                textDecoration: todo.completed ? "line-through" : "none" }}>
                      {todo.text}
                    </p>

                    {/* Tags */}
                    {todo.tags.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "8px" }}>
                        {todo.tags.map((tag) => (
                          <span key={tag} style={{ fontSize: "10px", background: t.accentSoft,
                                                   color: t.accentText, padding: "2px 6px",
                                                   borderRadius: "4px", fontWeight: 600 }}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "10px", color: t.textDim }}>{timeAgo(todo.createdAt)}</span>
                      {/* Move buttons */}
                      <div style={{ display: "flex", gap: "4px" }}>
                        {col.key !== "todo"  && <MoveBtn label="←" onClick={() => onMoveColumn(todo.id, col.key === "done" ? "doing" : "todo")}  t={t} />}
                        {col.key !== "done"  && <MoveBtn label="→" onClick={() => onMoveColumn(todo.id, col.key === "todo" ? "doing" : "done")}  t={t} />}
                        <MoveBtn label="🗑" onClick={() => onDelete(todo.id)} t={t} danger />
                      </div>
                    </div>
                  </div>
                );
              })}
              {colTodos.length === 0 && (
                <div style={{ textAlign: "center", padding: "24px 0", color: t.textDim, fontSize: "13px" }}>
                  No tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MoveBtn({ label, onClick, t, danger = false }: { label: string; onClick: () => void; t: any; danger?: boolean }) {
  return (
    <button onClick={onClick}
      style={{ background: "transparent", border: `1px solid ${t.border}`, borderRadius: "6px",
               padding: "2px 6px", fontSize: "11px", cursor: "pointer",
               color: danger ? "#ef4444" : t.textMuted, fontFamily: "inherit" }}>
      {label}
    </button>
  );
}