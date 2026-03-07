import { Layout } from "./components/layout";
import { MyEvents } from "./pages/my-events";
import { Events } from "./pages/events";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { EventDetails } from "./pages/event-details";
import { CreateEvent } from "./pages/create-event";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { Spinner } from "./components/spinner";
import { NoAuthorized } from "./components/no-authorized";
import { useAuth } from "./hooks/use-auth";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {
    user: { data: user, isLoading }
  } = useAuth();

  if (isLoading) return <Spinner />;
  if (!user) return <NoAuthorized />;

  return children;
}

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/events" element={<Events />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/events/:eventId" element={<EventDetails />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/events" replace />} />
      </Routes>
    </>
  );
}
