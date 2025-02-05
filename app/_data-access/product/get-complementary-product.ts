import { db } from "@/app/_lib/prisma";

export const getComplementaryProducts = (id: string) => {
  return db.product.findMany({
    where: {
      name: {
        contains: "Suco",
      },
      restaurantId: id,
    },
    include: {
      restaurant: true,
    },
  });
};
