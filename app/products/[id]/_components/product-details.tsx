"use client";
import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import ProductList from "@/app/_components/product-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";

import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/app/_helpers/price";
import { Prisma } from "@prisma/client";
import { ArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

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
  const [alertDialogIsOpen, setAlertDialogIsOpen] = useState(false);
  const { addProductToCart, cartIsOpen, toggleCart, products } =
    useContext(CartContext);

  const handleDecreseClick = () => {
    if (quantity <= 1) {
      return 1;
    }
    setQuantity((currentState) => currentState - 1);
  };
  const handleIncreaseClick = () => {
    setQuantity((currentState) => currentState + 1);
  };

  const handleAddToCartClick = () => {
    const productIsFromDiferentRestaurant =
      products.length > 0 && products[0].restaurantId !== product.restaurantId;
    if (productIsFromDiferentRestaurant) {
      return setAlertDialogIsOpen(true);
    }

    addProductToCart(product, quantity);
    toggleCart();
  };

  return (
    <>
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
          <DeliveryInfo restaurant={product.restaurant} />
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

        <div className="px-5 py-2">
          <Button onClick={handleAddToCartClick} className="w-full">
            Adicionar à sacola
          </Button>
        </div>
      </div>
      <Sheet open={cartIsOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="mb-4 text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>

      <AlertDialog open={alertDialogIsOpen} onOpenChange={setAlertDialogIsOpen}>
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de uma loja por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja esvaziar sacola e adicionar este item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => addProductToCart(product, quantity)}
            >
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDetails;
