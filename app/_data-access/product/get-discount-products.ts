import "server-only";
import { db } from "@/app/_lib/prisma";

export const getDiscountProducts = async () => {
  return db.product.findMany({
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    where: {
      priceDiscount: {
        gt: 0,
      },
      name: {
        not: {
          contains: "Suco",
        },
      },
    },
    take: 30,
  });
};
