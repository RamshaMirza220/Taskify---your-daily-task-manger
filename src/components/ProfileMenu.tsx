import { useAuth } from "../auth/useAuth";

type Props = {
  t: any;
  onOpenAuth: () => void;
  onClose: () => void;
};

export default function ProfileMenu({ t, onOpenAuth, onClose }: Props) {
  const { user, isGuest, signOut } = useAuth();

  return (
    <>
      {/* Backdrop to close menu on outside click */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 40 }} />

      <div style={{ position: "absolute", top: "52px", right: 0, zIndex: 50,
                    background: t.surface, border: `1px solid ${t.border}`,
                    borderRadius: "16px", padding: "20px", width: "260px",
                    boxShadow: t.cardShadow }}>
        {isGuest ? (
          // Guest profile card
          <>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>👤</div>
            <p style={{ color: t.text, fontWeight: 700, fontSize: "16px", margin: "0 0 6px" }}>Guest Mode</p>
            <p style={{ color: t.textMuted, fontSize: "13px", lineHeight: 1.5, margin: "0 0 16px" }}>
              You're currently using TODAY as a guest. Create an account or sign in to save your tasks.
            </p>
            <button onClick={() => { onOpenAuth(); onClose(); }}
              style={{ width: "100%", background: "#6366f1", border: "none", borderRadius: "10px",
                       padding: "10px", color: "white", fontSize: "14px", fontWeight: 700,
                       cursor: "pointer", fontFamily: "inherit" }}>
              Sign Up
            </button>
          </>
        ) : (
          // Logged-in profile card
          <>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#6366f122",
                          border: "2px solid #6366f1", display: "flex", alignItems: "center",
                          justifyContent: "center", fontSize: "18px", marginBottom: "12px" }}>
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <p style={{ color: t.text, fontWeight: 700, fontSize: "16px", margin: "0 0 2px" }}>{user?.name}</p>
            <p style={{ color: t.textMuted, fontSize: "12px", margin: "0 0 16px" }}>{user?.email}</p>
            <div style={{ height: "1px", background: t.border, margin: "0 0 12px" }} />
            <button onClick={() => { signOut(); onClose(); }}
              style={{ width: "100%", background: "transparent", border: `1px solid ${t.border}`,
                       borderRadius: "10px", padding: "10px", color: "#ef4444", fontSize: "14px",
                       cursor: "pointer", fontFamily: "inherit" }}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </>
  );
}