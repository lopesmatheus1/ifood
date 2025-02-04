import { AlignJustify } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-5 pb-1 pt-7">
      <Image
        src={"/ifood.png"}
        height={40}
        width={100}
        alt={"Imagem da logo Ifood"}
      />

      <Button className="h-10 w-10" variant={"ghost"}>
        <AlignJustify size={20} />
      </Button>
    </header>
  );
};

export default Header;
