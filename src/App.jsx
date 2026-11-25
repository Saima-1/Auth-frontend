import { Routes, Route, Navigate } from "react-router-dom";
import { Protected, GuestOnly } from "./components/Routes";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/login" element={<GuestOnly><Auth mode="login" /></GuestOnly>} />
      <Route path="/register" element={<GuestOnly><Auth mode="register" /></GuestOnly>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
