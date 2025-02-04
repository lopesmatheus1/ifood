import "server-only";
import { db } from "@/app/_lib/prisma";

export const getRestaurants = () => {
  return db.restaurant.findMany({});
};
