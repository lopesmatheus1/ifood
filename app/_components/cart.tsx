import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { createOrder } from "../_actions/order/create-order";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Loader2Icon } from "lucide-react";

const Cart = () => {
  const { products, subTotalPrice, totalPrice, totalDiscount, clearCart } =
    useContext(CartContext);
  const { data } = useSession();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isSubmitingLoading, setIsSubmitLoading] = useState(false);

  const handleCreateOrder = async () => {
    const restaurant = products[0].restaurant;
    if (!data?.user) return;

    try {
      setIsSubmitLoading(true);
      await createOrder({
        subTotalPrice,
        totalPrice,
        totalDiscounts: totalDiscount,
        deliveryFee: restaurant.deliveryFee,
        deliveryTime: restaurant.deliveryTime,
        status: "CONFIRMED",
        restaurant: {
          connect: { id: restaurant.id },
        },
        user: {
          connect: {
            id: data?.user?.id,
          },
        },
        orderProduct: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      });
      clearCart();
      setDialogIsOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setDialogIsOpen(false);
      setIsSubmitLoading(false);
    }
  };
  return (
    <>
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
                    <span className="text-sm text-muted-foreground">
                      Entrega
                    </span>
                    <p>
                      {Number(products[0].restaurant.deliveryFee) === 0 ? (
                        <span className="uppercase text-primary">Grátis</span>
                      ) : (
                        formatCurrency(
                          Number(products[0].restaurant.deliveryFee),
                        )
                      )}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex w-full items-center justify-between">
                    <p className="font-semibold">Total</p>
                    <p className="font-semibold">
                      {formatCurrency(totalPrice)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Button
                className="mt-3 w-full"
                onClick={() => setDialogIsOpen(true)}
              >
                Finalizar pedido
              </Button>
            </div>
          </>
        ) : (
          <p className="font-medium text-muted-foreground">Sacola vazia</p>
        )}
      </div>

      <AlertDialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <AlertDialogContent className="w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar seu pedido, você concorda com os termos e condições
              da nossa plataforma.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateOrder}
              disabled={isSubmitingLoading}
            >
              {isSubmitingLoading && (
                <Loader2Icon className="h-4 w-4 animate-spin" />
              )}
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Cart;
