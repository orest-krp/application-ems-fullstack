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
import { LoadingButton } from "../ui/loading-button";
import { useEventActions } from "@/hooks/use-event-actions";

type EventDetailsHeaderProps = {
  eventId: string;
  title: string;
  user: UserResponse | null;
  isEdited: boolean;
  isOrganizer: boolean;
  isJoined: boolean;
  isFull: boolean;

  onToggleEdit: () => void;
};

export function EventDetailsHeader({
  eventId,
  title,
  user,
  isEdited,
  isOrganizer,
  isJoined,
  isFull,
  onToggleEdit
}: EventDetailsHeaderProps) {
  const {
    joinEvent,
    leaveEvent,
    deleteEvent,
    joinEventLoading,
    leaveEventloading,
    deleteEventloading
  } = useEventActions(eventId);
  const onJoin = async () => {
    await joinEvent();
  };

  const onLeave = async () => {
    await leaveEvent();
  };

  const onDelete = async () => {
    await deleteEvent();
  };

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
              <LoadingButton onClick={onToggleEdit}>
                {isEdited ? (
                  <>
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Save className="mr-1 h-4 w-4" />
                    Edit
                  </>
                )}
              </LoadingButton>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <LoadingButton
                    variant="destructive"
                    loading={deleteEventloading}
                    loadingText="Deleting..."
                  >
                    <Delete className="mr-1 h-4 w-4" />
                    Delete
                  </LoadingButton>
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

                    <AlertDialogAction asChild>
                      <LoadingButton
                        variant="destructive"
                        loading={deleteEventloading}
                        loadingText="Deleting..."
                        onClick={onDelete}
                      >
                        Delete
                      </LoadingButton>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : isJoined ? (
            <LoadingButton
              variant="destructive"
              loading={leaveEventloading}
              loadingText="Leaving..."
              onClick={onLeave}
            >
              <UserMinus className="mr-1 h-4 w-4" />
              Leave
            </LoadingButton>
          ) : (
            <LoadingButton
              loading={joinEventLoading}
              loadingText="Joining..."
              onClick={onJoin}
              disabled={isFull}
            >
              <UserPlus className="mr-1 h-4 w-4" />
              {isFull ? "Full" : "Join"}
            </LoadingButton>
          )}
        </>
      )}
    </CardHeader>
  );
}
