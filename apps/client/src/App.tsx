import { Layout } from "./components/layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { NoAuthorized } from "./components/no-authorized";
import { useAuth } from "./hooks/use-auth";
import { Loading } from "./components/loading";
import { Suspense } from "react";
import { lazyPage } from "./components/lazy-page";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const {
    user: { data: user, isLoading }
  } = useAuth();

  if (isLoading) return <Loading />;
  if (!user) return <NoAuthorized />;

  return children;
}

const Events = lazyPage(() => import("./pages/events"), "Events");
const MyEvents = lazyPage(() => import("./pages/my-events"), "MyEvents");
const Login = lazyPage(() => import("./pages/login"), "Login");
const Register = lazyPage(() => import("./pages/register"), "Register");
const EventDetails = lazyPage(
  () => import("./pages/event-details"),
  "EventDetails"
);
const CreateEvent = lazyPage(
  () => import("./pages/create-event"),
  "CreateEvent"
);
const Invite = lazyPage(() => import("./pages/invite"), "Invite");

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/events"
            element={
              <Suspense fallback={<Loading />}>
                <Events />
              </Suspense>
            }
          />
          <Route
            path="/my-events"
            element={
              <Suspense fallback={<Loading />}>
                <MyEvents />
              </Suspense>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <Suspense fallback={<Loading />}>
                <EventDetails />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/login"
          element={
            <Suspense fallback={<Loading />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<Loading />}>
              <Register />
            </Suspense>
          }
        />
        <Route
          path="/events/:eventId/join"
          element={
            <Suspense fallback={<Loading />}>
              <Invite />
            </Suspense>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <Suspense fallback={<Loading />}>
                <CreateEvent />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/events" replace />} />
      </Routes>
    </>
  );
}
