import { getCategory } from "../_data-access/category/get-category";
import CategoryItem from "./quick-search-item";
import Link from "next/link";

const CategoryList = async () => {
  const categories = await getCategory();
  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <Link key={category.id} href={`/category/${category.id}/products`}>
          <CategoryItem category={category} key={category.id} />
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
