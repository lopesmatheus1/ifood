import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";

interface RestaurantProps {
  params: {
    id: string;
  };
}

const Restaurant = async ({ params: { id } }: RestaurantProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: { id },
    include: {
      categories: { orderBy: { name: "asc" } },
      products: {
        where: {
          restaurantId: id,
        },
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  if (!restaurant) return notFound;

  return (
    <div>
      <RestaurantImage restaurant={JSON.parse(JSON.stringify(restaurant))} />
      <RestaurantDetails restaurant={JSON.parse(JSON.stringify(restaurant))} />
    </div>
  );
};

export default Restaurant;
