"use client";
import ProductList from "@/app/_components/product-list";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import {
  ArrowDownIcon,
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProp {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>;
  complementaryProduct: Prisma.ProductGetPayload<{
    include: { restaurant: true };
  }>[];
}
const ProductDetails = ({
  product,
  complementaryProduct,
}: ProductDetailsProp) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecreseClick = () => {
    if (quantity <= 1) {
      return 1;
    }
    setQuantity((currentState) => currentState - 1);
  };
  const handleIncreaseClick = () => {
    setQuantity((currentState) => currentState + 1);
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="flex items-center gap-2 px-5 py-5 pb-1">
        <div className="relative flex h-6 w-6">
          <Image
            className="rounded-full object-cover"
            fill
            alt={product.restaurant.name}
            src={product.restaurant.imageUrl}
          />
        </div>
        <span className="text-sm text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>

      <h2 className="mb-3 px-5 text-xl font-semibold">{product.name}</h2>

      {/* PREÇO */}
      <div className="flex w-full items-center justify-between px-5">
        <div className="flex">
          {/* RIGHT SIDE */}
          <p className="text-xl font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </p>
          <Badge className="ml-2 px-1">
            <ArrowDownIcon size={16} />
            <span>{product.priceDiscount}%</span>
          </Badge>
        </div>
        {/* LEFT SIDE */}
        <div className="flex items-center gap-2 text-center">
          <Button
            onClick={handleDecreseClick}
            className="h-8 w-8 border-muted-foreground hover:bg-transparent"
            variant={"outline"}
          >
            <ChevronLeftIcon className="text-accent-foreground" size={16} />
          </Button>

          <h2 className="w-4 text-base font-semibold">{quantity}</h2>

          <Button className="h-8 w-8" onClick={handleIncreaseClick}>
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </div>
      <p className="px-5 text-sm text-muted-foreground">
        De: {formatCurrency(Number(product.price))}
      </p>

      {/* ENTREGA */}
      <div className="px-5">
        <Card className="my-6 border-none py-2">
          <div className="flex justify-around">
            <div>
              {/* PREÇO */}
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Entrega</span>
                <BikeIcon className="text-muted-foreground" size={15} />
              </div>
              <p className="text-center font-semibold text-accent-foreground">
                {Number(product.price) === 0
                  ? "Entrega Grátis"
                  : formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            </div>

            {/* TEMPO */}
            <div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Entrega</span>
                <ClockIcon className="text-muted-foreground" size={15} />
              </div>
              <p className="text-center font-semibold text-accent-foreground">
                {product.restaurant.deliveryTime} min
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* DESCRIÇAO */}
      <div className="space-y-1 px-5 py-2">
        <h2 className="text-start font-semibold text-accent-foreground">
          Sobre
        </h2>
        <p className="text-start text-sm text-muted-foreground">
          {product.description}
        </p>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sucos</h3>
        <ProductList products={complementaryProduct} />
      </div>
    </div>
  );
};

export default ProductDetails;
