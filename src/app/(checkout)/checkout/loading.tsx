import { Cog } from "lucide-react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Cog className="animate-spin text-primary" size={100} strokeWidth={2} />
    </div>
  );
}
