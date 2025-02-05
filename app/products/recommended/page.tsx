import Header from "@/app/_components/header";
import ProductItem from "@/app/_components/product-item";
import Search from "@/app/_components/search";
import { getAllProducts } from "@/app/_data-access/product/get-all-products";

const RecommendedProducts = async () => {
  const products = await getAllProducts();
  return (
    <div>
      <Header />

      <div className="px-5 py-5">
        <Search />
      </div>

      {/* TODO: PEGAR OS PRODUTOS COM MAIS PEDIDOS */}
      <div className="grid grid-cols-2 gap-4 px-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
