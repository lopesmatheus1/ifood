import { Category } from "@prisma/client";
import Image from "next/image";
interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex items-center gap-2 rounded-3xl px-4 py-3 shadow-md">
      <Image
        src={category.imageUrl}
        height={30}
        width={30}
        alt={`${category.name}`}
      />

      <span className="truncate text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;
