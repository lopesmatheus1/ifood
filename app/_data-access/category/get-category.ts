import "server-only";
import { db } from "@/app/_lib/prisma";

export const getCategory = async () => {
  return await db.category.findMany({});
};
