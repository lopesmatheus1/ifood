import { getRestaurants } from "../_data-access/restaurants/get-restaurants";

import RestaurantItem from "./restaurant-item";

const RestaurantList = async () => {
  const restaurants = await getRestaurants();
  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {restaurants.map((restaurant) => (
        <RestaurantItem restaurants={restaurant} key={restaurant.id} />
      ))}
    </div>
  );
};

export default RestaurantList;
