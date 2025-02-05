import { ArrowRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface RecomendedTitle {
  children: React.ReactNode;
  href: string;
}

const RecomendedTitle = ({ children, href }: RecomendedTitle) => {
  return (
    <div className="flex w-full items-center justify-between">
      <span className="font-semibold">{children}</span>

      <Button
        className="h-4 gap-1 px-1 text-sm text-primary hover:bg-transparent"
        variant={"ghost"}
        asChild
      >
        <Link href={href}>
          Ver todos
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
};

export default RecomendedTitle;
