import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

interface SidebarButtonProps {
  link: string;
  children: React.ReactNode;
}

const SidebarButton = ({ children, link }: SidebarButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className="justify-start rounded-full py-3"
      asChild
    >
      <Link href={link}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
