"use client";
import {
  HeartIcon,
  HouseIcon,
  LogInIcon,
  LogOutIcon,
  ScrollText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Category } from "@prisma/client";
import CategoryItem from "./quick-search-item";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

import SidebarButton from "./sidebar-button";

interface SidebarSheetContent {
  categories: Category[];
}

const SidebarSheetContent = ({ categories }: SidebarSheetContent) => {
  const handleSignInClick = () => signIn("google");
  const handleSignOutCick = () => signOut();
  const { data } = useSession();

  return (
    <SheetContent className="w-[90%]">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>
      <div className="flex h-full flex-col">
        {data?.user ? (
          <div className="flex w-full items-center justify-start gap-4 py-6">
            <div className="rounded-full bg-primary p-[1px]">
              <Avatar>
                <AvatarImage src={data.user.image ?? ""} />

                <AvatarFallback>{data.user.name?.split("")[0]}</AvatarFallback>
              </Avatar>
            </div>

            <div>
              <p className="font-semibold">{data.user.name}</p>
              <span className="text-sm text-muted-foreground">
                {data.user.email}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between py-6">
            <p className="font-semibold">Olá. Faça seu Login!</p>
            <Button onClick={handleSignInClick} className="h-10 w-10">
              <LogInIcon size={20} />
            </Button>
          </div>
        )}

        <Separator className="bg-muted-foreground/30" />

        {/* BOTÕES */}
        <div className="flex flex-auto flex-col gap-2 py-6">
          <SidebarButton link="/">
            <HouseIcon size={16} />
            Ínicio
          </SidebarButton>

          {data?.user && (
            <>
              <SidebarButton link="#">
                <ScrollText size={16} />
                Meus Pedidos
              </SidebarButton>

              <SidebarButton link="/restaurant/recommended">
                <HeartIcon size={16} />
                Restaurantes Favoritos
              </SidebarButton>
            </>
          )}

          <div className="py-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.id}/products`}
              >
                <CategoryItem category={category} key={category.id} />
              </Link>
            ))}
          </div>
        </div>

        {/* SIGN OUT */}
        <div className="py-6">
          {data?.user && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"ghost"} className="w-full justify-start">
                  <LogOutIcon size={16} />
                  Sair da conta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>Sair da conta</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deseja mesmo sair da plataforma
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSignOutCick}>
                    Sair
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </SheetContent>
  );
};

export default SidebarSheetContent;
