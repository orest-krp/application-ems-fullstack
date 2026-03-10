import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import type { UserResponse } from "@ems-fullstack/utils";
import { Delete, Save, UserMinus, UserPlus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

type Props = {
  title: string;
  user: UserResponse | null;
  isEdited: boolean;
  isOrganizer: boolean;
  isJoined: boolean;
  isFull: boolean;
  onToggleEdit: () => void;
  onDelete: () => void;
  onJoin: () => void;
  onLeave: () => void;
};

export function EventDetailsHeader({
  title,
  user,
  isEdited,
  isOrganizer,
  isJoined,
  isFull,
  onToggleEdit,
  onDelete,
  onJoin,
  onLeave
}: Props) {
  return (
    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <CardTitle className="text-xl">
        {isEdited ? "Edit Event" : title}
      </CardTitle>

      {!user && null}

      {user && (
        <>
          {isOrganizer ? (
            <div className="flex gap-2">
              <Button onClick={onToggleEdit}>
                {isEdited ? (
                  <>
                    <X className="mr-1" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Save className="mr-1" />
                    Edit
                  </>
                )}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Delete className="mr-1" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this event?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The event will be
                      permanently deleted.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={onDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : isJoined ? (
            <Button onClick={onLeave} variant="destructive">
              <UserMinus className="mr-1" />
              Leave
            </Button>
          ) : (
            <Button onClick={onJoin} disabled={isFull}>
              <UserPlus className="mr-1" />
              {isFull ? "Full" : "Join"}
            </Button>
          )}
        </>
      )}
    </CardHeader>
  );
}
