"use client";
import { useContext } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { CartContext } from "../_context/cart";
import { Button } from "./ui/button";
import Cart from "./cart";
import { formatCurrency } from "../_helpers/price";

const OpenCart = () => {
  const { cartIsOpen, toggleCart, products, subTotalPrice, totalQuantity } =
    useContext(CartContext);
  return (
    <>
      {products.length > 0 && cartIsOpen === false && (
        <div className="sticky bottom-0 left-0 z-[100] w-full bg-white p-5 pt-3">
          <div className="flex justify-between">
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-muted-foreground">Total sem entrega</p>
              <h2>
                {formatCurrency(subTotalPrice)}{" "}
                <span>
                  /{totalQuantity} {totalQuantity === 1 ? "Item" : "Itens"}
                </span>
              </h2>
            </div>

            <Button onClick={toggleCart} className="px-5">
              Ver Sacola
            </Button>
          </div>
        </div>
      )}

      <Sheet open={cartIsOpen} onOpenChange={toggleCart}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="mb-4 text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default OpenCart;
