import { getUniqueProduct } from "@/app/_data-access/product/get-unique-product";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "./_components/product-details";
import { getComplementaryProducts } from "@/app/_data-access/product/get-complementary-product";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getUniqueProduct(id);
  if (!product) return notFound();
  const complementaryProduct = await getComplementaryProducts(
    product?.restaurant.id,
  );

  return (
    <div>
      <ProductImage product={JSON.parse(JSON.stringify(product))} />

      <ProductDetails
        product={JSON.parse(JSON.stringify(product))}
        complementaryProduct={JSON.parse(JSON.stringify(complementaryProduct))}
      />
    </div>
  );
};

export default ProductPage;
