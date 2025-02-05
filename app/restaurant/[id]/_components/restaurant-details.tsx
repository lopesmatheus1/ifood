import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { Prisma } from "@prisma/client";
import { StarIcon } from "lucide-react";

interface RestaurantDetailsProps {
  restaurant: Prisma.RestaurantGetPayload<{
    include: {
      categories: true;
      products: { include: { restaurant: { select: { name: true } } } };
    };
  }>;
}

const RestaurantDetails = ({ restaurant }: RestaurantDetailsProps) => {
  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex justify-between px-5">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={restaurant.imageUrl} />
          </Avatar>
          <h2 className="text-lg font-semibold text-accent-foreground">
            {restaurant.name}
          </h2>
        </div>

        <Badge className="bg-accent-foreground ease-in-out hover:bg-accent-foreground/50">
          <StarIcon size={14} className="fill-current text-yellow-400" />
          <p className="ml-1 font-bold text-white">5.0</p>
        </Badge>
      </div>

      {/* ENTREGA */}
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      {/* CATEGORIAS */}
      <div className="px-5">
        <Card className="mb-8 border-none">
          <div className="flex w-full flex-wrap items-center justify-around overflow-x-auto">
            {restaurant.categories.map((categorey) => (
              <p className="text-sm text-muted-foreground" key={categorey.id}>
                {categorey.name}
              </p>
            ))}
          </div>
        </Card>
      </div>

      {/* TODO, SELECIONAR OS PRODUTOS COM MAIS PEDIDOS */}
      <div className="px-5">
        <h3 className="font-semibold">Mais pedidos</h3>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => {
        // Filtra os produtos que pertencem à categoria atual
        const filteredProducts = restaurant.products.filter(
          (product) => product.categoryId === category.id,
        );

        return (
          <div className="px-5" key={category.id}>
            <h3 className="mt-4 font-semibold">{category.name}</h3>
            <ProductList products={filteredProducts} />
          </div>
        );
      })}
    </div>
  );
};

export default RestaurantDetails;
