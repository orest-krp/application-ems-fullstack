import { Layout } from "./components/layout";
import { MyEvents } from "./pages/my-events";
import { Events } from "./pages/events";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { EventDetails } from "./pages/events-details";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/events" element={<Events />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/events" replace />} />
      </Routes>
    </>
  );
}
