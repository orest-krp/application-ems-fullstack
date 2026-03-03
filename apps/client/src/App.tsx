import { Layout } from "./components/layout";
import { MyEvents } from "./pages/my-events";
import { Events } from "./pages/events";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { EventDetails } from "./pages/events-details";
import { CreateEvent } from "./pages/create-event";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { useUser } from "./hooks/use-user";
import { Spinner } from "./components/spinner";
import type React from "react";
import type { User } from "@ems-fullstack/types";

function ProtectedRoute({
  user,
  children
}: React.PropsWithChildren<{ user: User | null }>) {
  if (!user) return <Navigate to="/events" replace />;
  return children;
}

function PublicRoute({
  user,
  children
}: React.PropsWithChildren<{ user: User | null }>) {
  if (user) return <Navigate to="/events" replace />;
  return children;
}

export default function App() {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/events" element={<Events />} />
          <Route path="/my-events" element={<MyEvents />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute user={user}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute user={user}>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute user={user}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/events" replace />} />
      </Routes>
    </>
  );
}
