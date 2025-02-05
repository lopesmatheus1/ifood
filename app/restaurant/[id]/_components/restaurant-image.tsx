"use client";
import FavoriteButton from "@/app/_components/favorite-button";
import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const route = useRouter();
  return (
    <div className="relative z-0 h-[220px] w-full">
      <Image
        alt={restaurant.name}
        src={restaurant.imageUrl}
        fill
        quality={100}
        className="object-cover"
      />
      <Button
        className="absolute left-5 top-6 h-10 w-10 rounded-full bg-secondary/50 text-secondary-foreground"
        onClick={() => route.push("/")}
      >
        <ChevronLeftIcon className="text-primary" size={20} />
      </Button>

      <div className="absolute right-5 top-6 h-10 w-10">
        <FavoriteButton />
      </div>
    </div>
  );
};

export default RestaurantImage;
