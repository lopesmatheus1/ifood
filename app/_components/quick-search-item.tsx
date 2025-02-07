import { Category } from "@prisma/client";
import Image from "next/image";
interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex h-12 items-center gap-2 rounded-3xl px-4 shadow-md">
      <Image
        src={category.imageUrl}
        height={22}
        width={22}
        alt={`${category.name}`}
      />

      <span className="truncate text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
