import { db } from "@/app/_lib/prisma";
import "server-only";

export const getUniqueRestaurant = async (id: string) => {
  return await db.restaurant.findUnique({
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
};
