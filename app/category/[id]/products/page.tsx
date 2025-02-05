import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import { getProductByCategory } from "@/app/_data-access/category/get-category";

import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

const CategoryPage = async ({ params: { id } }: CategoryPageProps) => {
  const category = await getProductByCategory(id);
  if (!category) return notFound();
  return (
    <>
      <Header />
      <h2 className="px-5 py-4 font-semibold text-accent-foreground">
        {category?.name}
      </h2>
      <div className="grid grid-cols-2 gap-4 px-5">
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
