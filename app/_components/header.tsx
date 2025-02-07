import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarSheetContent from "./sidebar-sheet-content";
import { getCategory } from "../_data-access/category/get-category";

const Header = async () => {
  const categories = await getCategory();
  return (
    <header className="flex w-full items-center justify-between px-5 pb-1 pt-7">
      <Link href={"/"}>
        <Image
          src={"/ifood.png"}
          height={40}
          width={100}
          alt={"Imagem da logo Ifood"}
        />
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-10 w-10" variant={"ghost"}>
            <AlignJustify size={20} />
          </Button>
        </SheetTrigger>
        <SidebarSheetContent categories={categories} />
      </Sheet>
    </header>
  );
};

export default Header;
