import type { ParticipantWithUser } from "@ems-fullstack/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Copy, Crown } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";

interface ParticipantsProps {
  participants: ParticipantWithUser[];
  eventCapacity: number | null;
  organizerId: string;
  invitationLink: string;
}

export function Participants({
  participants,
  eventCapacity,
  organizerId,
  invitationLink
}: ParticipantsProps) {
  const onCopy = async () => {
    if (!invitationLink) return;

    await navigator.clipboard.writeText(invitationLink);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">Participants</h3>

        <Button
          size="sm"
          variant="outline"
          onClick={onCopy}
          className="flex items-center gap-2"
        >
          <Copy size={16} />
          Invite Link
        </Button>
      </div>
      <Badge>
        {participants.length} / {eventCapacity ?? "∞"} joined
      </Badge>
      <ul className="grid gap-3">
        {participants.map((participant) => (
          <li
            key={participant.id}
            className="flex items-center justify-between border rounded-lg p-2 flex-wrap"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>
                  {participant.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{participant.user.name}</p>

                {participant.user.email && (
                  <p className="text-xs text-muted-foreground">
                    {participant.user.email}
                  </p>
                )}
              </div>
            </div>
            {participant.userId === organizerId && (
              <Badge className="flex items-center gap-1 mt-2">
                <Crown size={12} />
                Organizer
              </Badge>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
