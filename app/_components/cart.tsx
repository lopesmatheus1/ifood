import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscount } =
    useContext(CartContext);

  return (
    <div className="flex h-[95%] flex-col justify-between">
      {products.length > 0 ? (
        <>
          <div className="space-y-4">
            {products.map((product) => (
              // eslint-disable-next-line react/jsx-key
              <CartItem cartProduct={product} key={product.id} />
            ))}
          </div>

          <div className="mt-6">
            <Card className="border-muted-foreground/40">
              <CardContent className="flex flex-col justify-between space-y-1.5 p-5">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <p className="text-sm font-medium">
                    {formatCurrency(subTotalPrice)}
                  </p>
                </div>

                <Separator />

                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Descontos
                  </span>
                  <p className="text-sm font-medium">
                    {formatCurrency(totalDiscount)}
                  </p>
                </div>

                <Separator />

                <div className="flex w-full items-center justify-between">
                  <span className="text-sm text-muted-foreground">Entrega</span>
                  <p>
                    {Number(products[0].restaurant.deliveryFee) === 0 ? (
                      <span className="uppercase text-primary">Grátis</span>
                    ) : (
                      formatCurrency(Number(products[0].restaurant.deliveryFee))
                    )}
                  </p>
                </div>

                <Separator />

                <div className="flex w-full items-center justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold">
                    {formatCurrency(
                      totalPrice + Number(products[0].restaurant.deliveryFee),
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button className="mt-3 w-full">Finalizar pedido</Button>
          </div>
        </>
      ) : (
        <p className="font-medium text-muted-foreground">Sacola vazia</p>
      )}
    </div>
  );
};

export default Cart;
