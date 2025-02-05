import "server-only";
import { db } from "@/app/_lib/prisma";

export const getUniqueProduct = (id: string) => {
  return db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });
};
