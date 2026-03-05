"use client";

import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function NoAuthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <Card className="max-w-md w-full text-center shadow-lg border">
        <CardContent className="flex flex-col items-center gap-4 p-8">
          <AlertCircle className="h-16 w-16 text-destructive" />
          <CardTitle className="text-2xl sm:text-3xl text-foreground">
            Access Denied
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            You do not have permission to view this page.
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-center p-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
