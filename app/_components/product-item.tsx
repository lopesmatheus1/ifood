"use client";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { ArrowDownIcon } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import Link from "next/link";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="flex h-[220px] w-full max-w-[150px] flex-col rounded-xl shadow-md">
        <div className="relative min-h-[150px] w-[150px]">
          <Image
            alt={product.name}
            src={product.imageUrl}
            fill
            className="rounded-xl object-cover"
          />
          <Badge className="absolute left-2 top-2">
            <ArrowDownIcon size={16} />
            <span>{product.priceDiscount}%</span>
          </Badge>
        </div>

        <div className="h-full w-full">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <div className="flex gap-2">
            <h2 className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            <p className="text-sm text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </p>
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
