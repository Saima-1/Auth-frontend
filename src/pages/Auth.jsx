import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Auth({ mode }) {
  const isLogin = mode === "login";
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setBusy(true);
    try {
      await (isLogin ? login(form) : register(form));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Can't reach the server. Try again.");
    } finally { setBusy(false); }
  };

  return (
    <div className="split">
      <aside className="brand">
        <div className="logo">Harbor</div>
        <h1>A safe place for everything you build.</h1>
        <p>Your account, encrypted and ready in under a minute.</p>
      </aside>

      <main className="panel">
        <form onSubmit={submit} className="form">
          <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p className="sub">{isLogin ? "Log in to continue." : "It only takes a few seconds."}</p>

          {error && <div className="error" role="alert">{error}</div>}

          {!isLogin && (
            <label>Full name
              <input name="name" value={form.name} onChange={change} placeholder="Ayesha Khan" required />
            </label>
          )}
          <label>Email
            <input name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" required />
          </label>
          <label>Password
            <div className="pw">
              <input name="password" type={show ? "text" : "password"} value={form.password}
                onChange={change} placeholder="At least 6 characters" required />
              <button type="button" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
            </div>
          </label>

          <button className="primary" disabled={busy}>
            {busy ? "Please wait…" : isLogin ? "Log in" : "Create account"}
          </button>

          <p className="switch">
            {isLogin ? "New here? " : "Already have an account? "}
            <Link to={isLogin ? "/register" : "/login"}>{isLogin ? "Create an account" : "Log in"}</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
