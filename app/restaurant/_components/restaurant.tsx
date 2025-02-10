"use client";

import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";
import RestaurantItem from "@/app/_components/restaurant-item";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  if (!searchFor) {
    return notFound();
  }

  return (
    <>
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

export default Restaurants;
