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

type EventDetailsHeaderProps = {
  title: string;
  user: UserResponse | null;
  isEdited: boolean;
  isOrganizer: boolean;
  isJoined: boolean;
  isFull: boolean;

  isDeleting?: boolean;
  isJoining?: boolean;
  isLeaving?: boolean;
  isEditing?: boolean;

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
  isDeleting = false,
  isJoining = false,
  isLeaving = false,
  onToggleEdit,
  onDelete,
  onJoin,
  onLeave
}: EventDetailsHeaderProps) {
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
                    loading={isDeleting}
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
                        loading={isDeleting}
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
              loading={isLeaving}
              loadingText="Leaving..."
              onClick={onLeave}
            >
              <UserMinus className="mr-1 h-4 w-4" />
              Leave
            </LoadingButton>
          ) : (
            <LoadingButton
              loading={isJoining}
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
