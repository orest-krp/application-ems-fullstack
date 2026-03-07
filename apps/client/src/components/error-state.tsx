import { AlertCircle, Lock, SearchX, ServerCrash } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent
} from "@/components/ui/empty";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export interface FetchError {
  statusCode: number;
  error: string;
  messages: string[];
}

interface ErrorStateProps {
  error: FetchError;
}

export function ErrorState({ error }: ErrorStateProps) {
  const navigate = useNavigate();

  const getErrorIcon = () => {
    switch (error.statusCode) {
      case 401:
        return <Lock className="h-30 w-30 text-muted-foreground" />;
      case 404:
        return <SearchX className="h-30 w-30 text-muted-foreground" />;
      case 500:
        return <ServerCrash className="h-30 w-30 text-destructive" />;
      default:
        return <AlertCircle className="h-30 w-30 text-destructive" />;
    }
  };

  return (
    <Empty>
      <EmptyHeader>
        <EmptyContent>{getErrorIcon()}</EmptyContent>

        <EmptyTitle className="text-destructive text-4xl">
          {error.statusCode}
        </EmptyTitle>
        <EmptyDescription className="text-xl">
          {error.messages.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </EmptyDescription>
        <EmptyContent>
          <Button
            onClick={() => navigate("/events")}
            className="text-lg p-6 mt-4"
          >
            Go to main page
          </Button>
        </EmptyContent>
      </EmptyHeader>
    </Empty>
  );
}
