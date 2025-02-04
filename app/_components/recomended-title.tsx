import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";

const RecomendedTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="font-semibold">{children}</span>

      <Button
        className="h-4 gap-1 px-1 text-sm text-primary hover:bg-transparent"
        variant={"ghost"}
      >
        Ver todos
        <ArrowRightIcon />
      </Button>
    </div>
  );
};

export default RecomendedTitle;
