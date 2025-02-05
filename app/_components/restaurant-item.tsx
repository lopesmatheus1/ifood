import { Restaurant } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import FavoriteButton from "./favorite-button";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";
import { cn } from "../_lib/utils";
interface RestaurantItemProps {
  restaurants: Restaurant;
  className?: string;
}

const RestaurantItem = ({ restaurants, className }: RestaurantItemProps) => {
  return (
    <Link
      className={(cn("min-h-[240px] w-full max-w-[266px]"), className)}
      href={`/restaurant/${restaurants.id}`}
    >
      <div className="flex h-full w-full flex-col rounded-xl shadow-md">
        <div className="relative min-h-[187px] w-full min-w-[266px]">
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

          <div className="absolute right-2 top-2 h-8 w-8">
            <FavoriteButton />
          </div>
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
              <p>
                {Number(restaurants.deliveryFee) === 0
                  ? "Entrega Grátis"
                  : formatCurrency(Number(restaurants.deliveryFee))}
              </p>
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
    </Link>
  );
};

export default RestaurantItem;
