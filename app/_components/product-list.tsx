import { db } from "../_lib/prisma";
import ProductItem from "./product-item";

const ProductList = async () => {
  const products = await db.product.findMany({
    include: {
      restaurant: true,
    },
    where: {
      priceDiscount: {
        gt: 0,
      },
    },
  });

  return (
    <div className="flex gap-4 overflow-x-auto py-2">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
