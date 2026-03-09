import { useState } from "react";
import { type Todo } from "../constants";
import ProfileMenu from "./ProfileMenu";
import AnalyticsPanel from "./AnalyticsPanel";

type Props = {
  t: any;
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  todos: Todo[];
  activeCount: number;
  completedCount: number;
  onOpenAuth: () => void;
  view: "list" | "board";
  setView: (v: "list" | "board") => void;
};

export default function Header({ t, isDark, setIsDark, todos, activeCount, completedCount, onOpenAuth, view, setView }: Props) {
  const [showProfile,   setShowProfile]   = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize: "42px", fontWeight: 800, color: t.text, margin: 0,
                         letterSpacing: "-1.5px", lineHeight: 1,
                         fontFamily: "'DM Serif Display', Georgia, serif" }}>
              Taskify
            </h1>
            <p style={{ fontSize: "13px", color: t.textMuted, margin: "6px 0 0" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
            {/* Stat badges */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "flex-end" }}>
              {[{ color: "#6366f1", label: `${activeCount} left` },
                ...(completedCount > 0 ? [{ color: "#10b981", label: `${completedCount} done` }] : [])
              ].map(({ color, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px",
                     background: t.statBg, padding: "4px 10px", borderRadius: "20px",
                     border: `1px solid ${t.border}` }}>
                  <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: color, display: "inline-block" }} />
                  <span style={{ fontSize: "12px", color: t.textMuted, fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>

            {/* Controls row */}
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              {/* View switcher */}
              <div style={{ display: "flex", background: t.toggleBg, border: `1px solid ${t.border}`,
                            borderRadius: "10px", overflow: "hidden" }}>
                {(["list", "board"] as const).map((v) => (
                  <button key={v} onClick={() => setView(v)}
                    style={{ padding: "5px 12px", border: "none", cursor: "pointer", fontFamily: "inherit",
                             fontSize: "12px", fontWeight: 600,
                             background: view === v ? t.accent : "transparent",
                             color: view === v ? "white" : t.textMuted,
                             transition: "all 0.15s" }}>
                    {v === "list" ? "☰ List" : "⬛ Board"}
                  </button>
                ))}
              </div>

              {/* Analytics button */}
              <button onClick={() => setShowAnalytics(true)}
                style={{ background: t.toggleBg, border: `1px solid ${t.border}`, borderRadius: "10px",
                         padding: "5px 12px", cursor: "pointer", color: t.textMuted,
                         fontSize: "12px", fontFamily: "inherit" }}>
                📊
              </button>

              {/* Theme toggle */}
              <button className="theme-toggle" onClick={() => setIsDark(!isDark)}
                style={{ display: "flex", alignItems: "center", gap: "7px",
                         background: t.toggleBg, border: `1px solid ${t.border}`,
                         borderRadius: "10px", padding: "5px 12px", cursor: "pointer",
                         color: t.textMuted, fontSize: "12px", fontWeight: 500,
                         fontFamily: "inherit", transition: "all 0.25s" }}>
                {t.toggleIcon}
              </button>

              {/* Profile button */}
              <div style={{ position: "relative" }}>
                <button onClick={() => setShowProfile(!showProfile)}
                  style={{ width: "32px", height: "32px", borderRadius: "50%",
                           background: "#6366f122", border: "2px solid #6366f1",
                           cursor: "pointer", fontSize: "14px", display: "flex",
                           alignItems: "center", justifyContent: "center", color: "#6366f1", fontWeight: 700 }}>
                  👤
                </button>
                {showProfile && (
                  <ProfileMenu t={t} onOpenAuth={onOpenAuth} onClose={() => setShowProfile(false)} />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {todos.length > 0 && (
          <div style={{ height: "3px", background: t.progressBg, borderRadius: "99px", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "99px",
                          background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
                          width: `${(completedCount / todos.length) * 100}%`,
                          transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
          </div>
        )}
      </div>

      {showAnalytics && <AnalyticsPanel t={t} todos={todos} onClose={() => setShowAnalytics(false)} />}
    </>
  );
}