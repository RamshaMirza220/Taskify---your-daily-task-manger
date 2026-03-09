import { useState } from "react";
import { useAuth } from "../auth/useAuth";

type Props = {
  onGoToSignIn: () => void;
};

export default function SignUp({ onGoToSignIn }: Props) {
  const { signUp } = useAuth();
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    const err = signUp(name, email, password);
    if (err) { setError(err); return; }
    setSuccess(true);
    // Redirect to sign in after 1.5 seconds
    setTimeout(() => onGoToSignIn(), 1500);
  };

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={{ fontSize: "32px", marginBottom: "8px" }}>✦</div>
        <h1 style={title}>Create account</h1>
        <p style={sub}>Start managing your day, your way.</p>

        {success ? (
          <div style={successBox}>Account created successfully 🎉<br/>Redirecting to sign in...</div>
        ) : (
          <>
            {error && <div style={errorBox}>{error}</div>}
            <input style={input} placeholder="Full Name"    value={name}     onChange={(e) => setName(e.target.value)} />
            <input style={input} placeholder="Email"        value={email}    onChange={(e) => setEmail(e.target.value)}    type="email" />
            <input style={input} placeholder="Password"     value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            <button style={btn} onClick={handleSubmit}>Create Account</button>
            <p style={link} onClick={onGoToSignIn}>Already have an account? <span style={linkSpan}>Sign In</span></p>
          </>
        )}
      </div>
    </div>
  );
}

const wrap:       React.CSSProperties = { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0f14", padding: "24px" };
const card:       React.CSSProperties = { background: "#13151e", border: "1px solid #1e2130", borderRadius: "20px", padding: "40px 36px", width: "100%", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "12px" };
const title:      React.CSSProperties = { color: "#f3f4f6", fontSize: "24px", fontWeight: 800, margin: 0, letterSpacing: "-0.5px" };
const sub:        React.CSSProperties = { color: "#6b7280", fontSize: "14px", margin: "0 0 8px" };
const input:      React.CSSProperties = { background: "#0d0f14", border: "1px solid #1e2130", borderRadius: "10px", padding: "12px 14px", color: "#f3f4f6", fontSize: "14px", outline: "none", fontFamily: "inherit", width: "100%", boxSizing: "border-box" };
const btn:        React.CSSProperties = { background: "#6366f1", border: "none", borderRadius: "10px", padding: "12px", color: "white", fontSize: "14px", fontWeight: 700, cursor: "pointer", marginTop: "4px", fontFamily: "inherit" };
const link:       React.CSSProperties = { color: "#6b7280", fontSize: "13px", textAlign: "center", margin: "4px 0 0", cursor: "pointer" };
const linkSpan:   React.CSSProperties = { color: "#6366f1", fontWeight: 600 };
const errorBox:   React.CSSProperties = { background: "#1f1416", border: "1px solid #ef444433", borderRadius: "8px", padding: "10px 14px", color: "#ef4444", fontSize: "13px" };
const successBox: React.CSSProperties = { background: "#0f1f18", border: "1px solid #10b98133", borderRadius: "8px", padding: "16px", color: "#10b981", fontSize: "14px", textAlign: "center", lineHeight: 1.6 };