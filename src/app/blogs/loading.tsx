import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="mx-auto mt-10">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h3 className="text-xl font-semibold">Loading...</h3>
      </div>
    </div>
  );
}
