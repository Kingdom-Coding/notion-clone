import { Button } from "@/components/ui/button";
import { ArrowLeftCircleIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex space-x-2 items-center animate-pulse sm:items-start">
      <ArrowLeftCircleIcon className="w-12 h-12" />
      <h1>Create a new loadout now!</h1>
      <Button>Click Me</Button>
    </main>
  );
}
