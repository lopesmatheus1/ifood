import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import FavoriteButton from "@/app/_components/favorite-button";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
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
        className="absolute left-5 top-6 h-10 w-10 rounded-full bg-secondary/50 text-secondary-foreground"
        asChild
      >
        <Link href={"/"}>
          <ChevronLeftIcon size={20} />
        </Link>
      </Button>

      <div className="absolute right-5 top-6 h-10 w-10">
        <FavoriteButton />
      </div>
    </div>
  );
};

export default ProductImage;
