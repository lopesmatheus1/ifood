"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl" | "restaurantId">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  return (
    <div className="relative z-0 h-[360px] w-full">
      <Image
        alt={product.name}
        src={product.imageUrl}
        fill
        quality={100}
        className="object-cover"
      />
      <Button
        onClick={() => router.push(`/restaurant/${product.restaurantId}`)}
        className="absolute left-5 top-6 h-10 w-10 rounded-full bg-secondary/50 text-secondary-foreground"
      >
        <ChevronLeftIcon size={20} />
      </Button>
    </div>
  );
};

export default ProductImage;
