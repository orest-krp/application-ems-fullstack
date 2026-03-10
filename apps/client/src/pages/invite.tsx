import { ErrorState } from "@/components/error-state";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { useEventActions } from "@/hooks/use-event-actions";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MailCheck, PartyPopper } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { NoAuthorized } from "@/components/no-authorized";

export function Invite() {
  const {
    user: { data: user, isLoading }
  } = useAuth();
  const { eventId } = useParams<{ eventId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") ?? undefined;

  const { joinEvent, joinEventLoading, joinEventError } = useEventActions(
    eventId ?? null,
    token
  );

  const handleJoin = async () => {
    await joinEvent();
    navigate(`/events/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <NoAuthorized />;
  }

  if (!eventId) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 rounded-full bg-primary/10">
            <MailCheck className="h-8 w-8 text-primary" />
          </div>

          <CardTitle className="text-2xl">You're Invited 🎉</CardTitle>

          <CardDescription>
            Someone invited you to join an event. Click the button below to
            join.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-6">
          {joinEventError && <ErrorState error={joinEventError} />}

          {joinEventLoading ? (
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Spinner />
              <p className="text-sm">Joining event...</p>
            </div>
          ) : (
            !joinEventError && (
              <Button
                onClick={handleJoin}
                className="w-full flex items-center gap-2"
                size="lg"
              >
                <PartyPopper className="h-4 w-4" />
                Join Event
              </Button>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
