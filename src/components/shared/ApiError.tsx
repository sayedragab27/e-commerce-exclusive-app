import { AlertCircleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ApiError({
  title,
  message,
}: {
  title: string;
  message: string | null;
}) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4 mb-4">
      <Alert variant="destructive">
        <AlertCircleIcon className="w-4 h-4 text-destructive" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          <p>{message}</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
