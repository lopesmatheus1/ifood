import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import RestaurantDetails from "./_components/restaurant-details";
import { getUniqueRestaurant } from "@/app/_data-access/restaurants/get-unique-restaurant";

interface RestaurantProps {
  params: {
    id: string;
  };
}

const Restaurant = async ({ params: { id } }: RestaurantProps) => {
  const restaurant = await getUniqueRestaurant(id);

  if (!restaurant) return notFound;

  return (
    <div>
      <RestaurantImage restaurant={JSON.parse(JSON.stringify(restaurant))} />
      <RestaurantDetails restaurant={JSON.parse(JSON.stringify(restaurant))} />
    </div>
  );
};

export default Restaurant;
