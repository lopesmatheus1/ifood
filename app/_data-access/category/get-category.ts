import "server-only";
import { db } from "@/app/_lib/prisma";

export const getCategory = async () => {
  return await db.category.findMany({});
};

export const getProductByCategory = (id: string) => {
  return db.category.findUnique({
    where: { id },
    include: {
      products: {
        include: {
          restaurant: { select: { name: true } },
        },
        take: 20,
      },
    },
  });
};
