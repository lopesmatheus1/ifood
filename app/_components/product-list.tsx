import { getDiscountProducts } from "../_data-access/product/get-discount-products";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await getDiscountProducts();

  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
