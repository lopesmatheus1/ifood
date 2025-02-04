import { getCategory } from "../_data-access/category/get-category";
import CategoryItem from "./quick-search-item";

const CategoryList = async () => {
  const categories = await getCategory();
  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
