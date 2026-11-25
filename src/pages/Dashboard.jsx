import { useAuth } from "../context/AuthContext";

const fmt = (d) => (d ? new Date(d).toLocaleString([], { dateStyle: "medium", timeStyle: "short" }) : "—");

export default function Dashboard() {
  const { user, logout } = useAuth();
  const rows = [
    ["Email", user.email],
    ["Member since", fmt(user.createdAt)],
    ["Last login", fmt(user.lastLogin)],
    ["Total logins", user.loginCount],
  ];

  return (
    <div className="dash">
      <header>
        <div className="logo dark">Harbor</div>
        <button className="ghost" onClick={logout}>Log out</button>
      </header>
      <section className="hello">
        <div className="avatar">{user.name[0].toUpperCase()}</div>
        <h1>Hello, {user.name}</h1>
        <p>You're signed in. Your details are saved in MongoDB Atlas.</p>
      </section>
      <section className="facts">
        {rows.map(([k, v]) => (
          <div key={k}><span>{k}</span><strong>{v}</strong></div>
        ))}
      </section>
    </div>
  );
}
