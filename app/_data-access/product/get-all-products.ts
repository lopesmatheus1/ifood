import { db } from "@/app/_lib/prisma";
import "server-only";

export const getAllProducts = () => {
  return db.product.findMany({
    include: {
      restaurant: {
        select: { name: true },
      },
    },
    take: 40,
  });
};
