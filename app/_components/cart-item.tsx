import { CartContext, CartProducts } from "../_context/cart";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProduct: CartProducts;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const { increaseQuantity, decreaseQuantity, deleteProductFromCart } =
    useContext(CartContext);

  const handleIncreaseQuantityClick = () => {
    return increaseQuantity(cartProduct.id);
  };

  const handleDecreaseQuantityClick = () => {
    decreaseQuantity(cartProduct.id);
  };

  const handleDeleteClick = () => {
    deleteProductFromCart(cartProduct.id);
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="relative flex h-20 w-20 items-center">
          <Image
            className="rounded-lg object-cover"
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
          />
        </div>

        <div className="flex flex-col space-y-1">
          <h3 className="text-sm font-semibold">{cartProduct.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>

            {cartProduct.priceDiscount !== 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-center">
            <Button
              className="h-8 w-8 border-muted-foreground hover:bg-transparent"
              variant={"outline"}
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon className="text-accent-foreground" size={16} />
            </Button>

            <h2 className="w-5 text-center text-sm font-semibold">
              {cartProduct.quantity}
            </h2>

            <Button onClick={handleIncreaseQuantityClick} className="h-8 w-8">
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        onClick={handleDeleteClick}
        className="h-8 w-8 border-muted-foreground"
        variant={"outline"}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
