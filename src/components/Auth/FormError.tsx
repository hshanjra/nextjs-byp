import { AlertCircle } from "lucide-react";

export default function FormError({ message }: { message?: string | null }) {
  if (!message) return null;

  return (
    <div className="my-2 flex items-center gap-x-2 rounded-md text-destructive">
      <AlertCircle className="h-5 w-5" />
      <p className="text-sm">{message}</p>
    </div>
  );
}
