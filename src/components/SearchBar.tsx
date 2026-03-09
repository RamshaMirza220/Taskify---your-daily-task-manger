import { TAGS } from "../constants";

type Props = {
  t: any;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  activeTag: string;
  setActiveTag: (tag: string) => void;
};

export default function SearchBar({ t, searchQuery, setSearchQuery, activeTag, setActiveTag }: Props) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px",
                    background: t.searchBg, borderRadius: "10px", padding: "0 12px",
                    marginBottom: "10px", border: `1px solid ${t.border}` }}>
        <svg style={{ color: t.textDim, flexShrink: 0 }} width="15" height="15"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input className="search-input"
          style={{ flex: 1, background: "transparent", border: "none", padding: "11px 0",
                   color: t.text, fontSize: "13px", outline: "none", fontFamily: "inherit" }}
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")}
            style={{ background: "none", border: "none", color: t.textMuted, cursor: "pointer", fontSize: "18px" }}>×</button>
        )}
      </div>

      {/* Tag filter row */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {["All", ...TAGS].map((tag) => {
          const active = activeTag === tag;
          return (
            <button key={tag} onClick={() => setActiveTag(tag)}
              style={{ padding: "3px 10px", borderRadius: "6px", cursor: "pointer",
                       fontFamily: "inherit", fontSize: "11px", fontWeight: active ? 700 : 400,
                       background: active ? t.accentSoft : "transparent",
                       border: `1px solid ${active ? t.accent : t.border}`,
                       color: active ? t.accentText : t.textMuted }}>
              {tag === "All" ? "All Tags" : `#${tag}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}