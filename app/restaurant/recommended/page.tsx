import Header from "@/app/_components/header";
import RestaurantItem from "@/app/_components/restaurant-item";
import { getRestaurants } from "@/app/_data-access/restaurants/get-restaurants";

const RecommendedRestaurants = async () => {
  const restaurants = await getRestaurants();
  return (
    <>
      <Header />
      <h2 className="px-5 py-4 text-lg font-semibold">
        Restaurantes mais famosos
      </h2>
      <div className="flex flex-col gap-6 px-5">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurants={restaurant} />
        ))}
      </div>
    </>
  );
};

export default RecommendedRestaurants;
