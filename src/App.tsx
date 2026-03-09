import { useState, useEffect } from "react";
import { THEMES, generateId } from "./theme";
import { type Todo, priorityConfig } from "./constants";
import { useAuth } from "./auth/useAuth";

import Header      from "./components/Header";
import InputCard   from "./components/InputCard";
import SearchBar   from "./components/SearchBar";
import FilterBar   from "./components/FilterBar";
import TodoItem    from "./components/TodoItem";
import KanbanBoard from "./components/KanbanBoard";
import SignIn      from "./pages/SignIn";
import SignUp      from "./pages/SignUp";

type AuthPage = "signin" | "signup" | null;

export default function App() {
  const { user, isGuest, saveTodos } = useAuth();

  const [isDark,       setIsDark]       = useState(true);
  const [todos,        setTodos]        = useState<Todo[]>([]);
  const [inputValue,   setInputValue]   = useState("");
  const [filter,       setFilter]       = useState("All");
  const [priority,     setPriority]     = useState("medium");
  const [editingId,    setEditingId]    = useState<string | null>(null);
  const [editValue,    setEditValue]    = useState("");
  const [dragId,       setDragId]       = useState<string | null>(null);
  const [dragOver,     setDragOver]     = useState<string | null>(null);
  const [searchQuery,  setSearchQuery]  = useState("");
  const [activeTag,    setActiveTag]    = useState("All");
  const [view,         setView]         = useState<"list" | "board">("list");
  const [authPage,     setAuthPage]     = useState<AuthPage>(null);

  useEffect(() => {
    if (user) setTodos(user.todos);
  }, [user?.id]);

  useEffect(() => {
    if (!isGuest) saveTodos(todos);
  }, [todos]);

  const t = isDark ? THEMES.dark : THEMES.light;

  if (authPage === "signup") return <SignUp onGoToSignIn={() => setAuthPage("signin")} />;
  if (authPage === "signin") return <SignIn onGoToSignUp={() => setAuthPage("signup")} onGuestMode={() => setAuthPage(null)} />;

  const filtered = todos
    .filter((td) => filter === "Active" ? !td.completed : filter === "Completed" ? td.completed : true)
    .filter((td) => td.text.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((td) => activeTag === "All" || td.tags.includes(activeTag));

  const activeCount    = todos.filter((td) => !td.completed).length;
  const completedCount = todos.filter((td) =>  td.completed).length;

  const addTodo = (dueDate: string, dueTime: string, tags: string[]) => {
    const text = inputValue.trim();
    if (!text) return;
    const newTodo: Todo = {
      id: generateId(), text, completed: false, priority,
      createdAt: Date.now(), dueDate, dueTime, tags, column: "todo",
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const toggleTodo     = (id: string) => setTodos(todos.map((td) => td.id === id ? { ...td, completed: !td.completed, column: !td.completed ? "done" : "todo" } : td));
  const deleteTodo     = (id: string) => setTodos(todos.filter((td) => td.id !== id));
  const clearCompleted = ()           => setTodos(todos.filter((td) => !td.completed));
  const startEdit      = (todo: Todo) => { setEditingId(todo.id); setEditValue(todo.text); };
  const saveEdit       = (id: string) => {
    const text = editValue.trim();
    if (text) setTodos(todos.map((td) => td.id === id ? { ...td, text } : td));
    setEditingId(null);
  };
  const moveColumn = (id: string, column: Todo["column"]) =>
    setTodos(todos.map((td) => td.id === id ? { ...td, column, completed: column === "done" } : td));

  const handleDrop = (targetId: string) => {
    if (!dragId || dragId === targetId) { setDragId(null); setDragOver(null); return; }
    const arr = [...todos];
    const [moved] = arr.splice(todos.findIndex((td) => td.id === dragId), 1);
    arr.splice(todos.findIndex((td) => td.id === targetId), 0, moved);
    setTodos(arr);
    setDragId(null); setDragOver(null);
  };

  const pColor = (p: string) => ({
    bg:     t.tagBg(priorityConfig[p].dot),
    border: t.tagBorder(priorityConfig[p].dot),
    dot:    priorityConfig[p].dot,
  });

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800&family=DM+Serif+Display&display=swap');
    * { box-sizing: border-box; } body { margin: 0; }
    @keyframes slideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
    .todo-item { transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
    .todo-item:hover { background: ${t.surfaceHover} !important; border-color: ${t.borderHover} !important; box-shadow: ${t.cardShadow} !important; }
    .todo-item:hover .todo-actions { opacity: 1 !important; }
    .main-input:focus { border-color: ${t.accent} !important; box-shadow: 0 0 0 3px ${t.accent}22 !important; }
    .main-input::placeholder, .search-input::placeholder { color: ${t.textDim}; }
    .add-btn:hover    { background: ${t.accentHover} !important; transform: scale(1.06); }
    .filter-btn:hover { color: ${t.text} !important; }
    .clear-btn:hover  { color: #ef4444 !important; }
    .action-btn:hover { background: ${t.border} !important; color: ${t.text} !important; }
    .delete-btn:hover { color: #ef4444 !important; background: ${t.deleteBg} !important; }
    .priority-btn:hover { opacity: 0.8; transform: translateY(-1px); }
    .checkbox-btn:hover { transform: scale(1.12) !important; }
    .theme-toggle:hover { opacity: 0.8; }
    input[type="date"], input[type="time"] { color-scheme: ${isDark ? "dark" : "light"}; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-thumb { background: ${t.border}; border-radius: 2px; }
  `;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "flex-start",
                  justifyContent: "center", padding: "48px 16px 80px",
                  fontFamily: "'DM Sans', 'Segoe UI', sans-serif", transition: "background 0.3s" }}>
      <style>{css}</style>
      <div style={{ width: "100%", maxWidth: view === "board" ? "900px" : "560px", transition: "max-width 0.3s" }}>

        <Header t={t} isDark={isDark} setIsDark={setIsDark} todos={todos}
                activeCount={activeCount} completedCount={completedCount}
                onOpenAuth={() => setAuthPage("signin")}
                view={view} setView={setView} />

        {view === "list" && (
          <>
            <InputCard t={t} priority={priority} setPriority={setPriority}
                       inputValue={inputValue} setInputValue={setInputValue}
                       addTodo={addTodo} pColor={pColor} />

            <SearchBar t={t} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                       activeTag={activeTag} setActiveTag={setActiveTag} />

            <FilterBar t={t} filter={filter} setFilter={setFilter} todos={todos}
                       activeCount={activeCount} completedCount={completedCount}
                       clearCompleted={clearCompleted} />

            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "48px 24px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>
                    {searchQuery ? "🔍" : todos.every((td) => td.completed) && todos.length ? "🎉" : "✦"}
                  </div>
                  <p style={{ color: t.textDim, fontSize: "14px", margin: 0 }}>
                    {searchQuery ? `No tasks match "${searchQuery}"` : "No tasks here."}
                  </p>
                </div>
              )}
              {filtered.map((todo, idx) => (
                <TodoItem key={todo.id} todo={todo} t={t} idx={idx} pColor={pColor}
                          editingId={editingId} editValue={editValue} setEditValue={setEditValue}
                          toggleTodo={toggleTodo} deleteTodo={deleteTodo}
                          startEdit={startEdit} saveEdit={saveEdit} setEditingId={setEditingId}
                          dragId={dragId} dragOver={dragOver} setDragId={setDragId}
                          setDragOver={setDragOver} handleDrop={handleDrop} />
              ))}
            </div>
          </>
        )}

        {view === "board" && (
          <KanbanBoard t={t} todos={todos} onMoveColumn={moveColumn} onDelete={deleteTodo} />
        )}

        {todos.length > 0 && view === "list" && (
          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <span style={{ fontSize: "11px", color: t.textDim }}>
              Double-click to edit · Drag to reorder
            </span>
          </div>
        )}
      </div>
    </div>
  );
}