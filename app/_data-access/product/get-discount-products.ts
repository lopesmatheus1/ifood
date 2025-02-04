import "server-only";
import { db } from "@/app/_lib/prisma";

export const getDiscountProducts = async () => {
  return db.product.findMany({
    include: {
      restaurant: true,
    },
    where: {
      priceDiscount: {
        gt: 0,
      },
    },
  });
};
