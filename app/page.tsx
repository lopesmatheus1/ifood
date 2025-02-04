import Header from "./_components/header";
import Image from "next/image";
import Search from "./_components/search";
import CategoryList from "./_components/category-list";
import RecomendedTitle from "./_components/recomended-title";
import ProductList from "./_components/product-list";
import RestaurantList from "./_components/restaurant-list";

export default async function Home() {
  return (
    <div>
      <Header />

      {/* INPUT DE BUSCA */}
      <div className="px-5 py-6">
        <Search />
      </div>

      {/* BUSCA RÁPIDA DE CATEGORIAS */}
      <div className="px-5 pb-6">
        <CategoryList />
      </div>

      {/* BANNER */}
      <div className="px-5">
        <Image
          className="h-auto w-full rounded-xl object-cover"
          height={0}
          width={0}
          sizes="100vw"
          src={"/pizzaBanner.png"}
          alt="Até 30% de desconto em Pizzas"
          quality={100}
        />
      </div>

      {/* LISTA DE PRODUTOS */}
      <div className="space-y-1 px-5 py-6">
        <RecomendedTitle>Pedidos recomendados</RecomendedTitle>
        <ProductList />
      </div>

      {/* BANNER */}
      <div className="px-5">
        <Image
          className="h-auto w-full rounded-xl object-cover"
          height={0}
          width={0}
          sizes="100vw"
          src={"/burguerBanner.png"}
          alt="Até 30% de desconto em Pizzas"
          quality={100}
        />
      </div>

      <div className="px-5 py-6">
        <RecomendedTitle>Restaurantes Recomendados</RecomendedTitle>
        <RestaurantList />
      </div>
    </div>
  );
}
