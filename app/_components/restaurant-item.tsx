import { Restaurant } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import FavoriteButton from "./favorite-button";

interface RestaurantItemProps {
  restaurants: Restaurant;
}

const RestaurantItem = ({ restaurants }: RestaurantItemProps) => {
  return (
    <div className="flex min-h-[240px] w-full max-w-[266px] flex-col rounded-xl shadow-md">
      <div className="relative min-h-[187px] w-[266px]">
        <Image
          alt={restaurants.name}
          src={restaurants.imageUrl}
          fill
          className="rounded-xl object-cover"
        />
        <Badge className="absolute left-2 top-3 bg-white hover:bg-white">
          <StarIcon size={12} className="fill-current text-yellow-400" />
          <p className="ml-1 font-bold text-accent-foreground">5.0</p>
        </Badge>

        <FavoriteButton />
      </div>

      <div className="mt-3 h-full w-full p-1">
        <p className="truncate font-bold">{restaurants.name}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Image
              alt="Icone motoboy"
              src={"/motoboy.svg"}
              width={16}
              height={16}
            />
            <p>Entrega Gráts</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              alt="Icone relogio"
              src={"/clock.svg"}
              width={16}
              height={16}
            />
            <p>{restaurants.deliveryTime} min</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;
